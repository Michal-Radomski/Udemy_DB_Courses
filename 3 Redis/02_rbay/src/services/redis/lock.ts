import { randomBytes } from "crypto";

import { client } from "./client";

export const withLock = async (
  key: string,
  cb: (redisClient: Client, signal: { expired: boolean }) => void
): Promise<void> => {
  // Initialize a few variables to control retry behavior
  const retryDelayMs = 100;
  const timeoutMs = 2000;
  let retries = 20;

  // Generate a random value to store at the lock key
  const token: string = randomBytes(6).toString("hex");
  // Create the lock key
  const lockKey: string = `lock:${key}`;

  // Set up a while loop to implement the retry behavior
  while (retries >= 0) {
    retries--;
    // Try to do a SET NX operation
    const acquired: string = await client.set(lockKey, token, {
      NX: true,
      PX: timeoutMs,
    });

    if (!acquired) {
      // ELSE brief pause (retryDelayMs) and then retry
      await pause(retryDelayMs);
      continue;
    }

    // IF the set is successful, then run the callback
    try {
      const signal = { expired: false };
      setTimeout(() => {
        signal.expired = true;
      }, timeoutMs);

      const proxiedClient = buildClientProxy(timeoutMs);
      const result = await cb(proxiedClient, signal);
      return result;
    } finally {
      await client.unlock(lockKey, token);
    }
  }
};

type Client = typeof client;
const buildClientProxy = (timeoutMs: number): Client => {
  const startTime: number = Date.now();

  const handler = {
    get(target: Client, prop: keyof Client) {
      if (Date.now() >= startTime + timeoutMs) {
        throw new Error("Lock has expired.");
      }

      const value = target[prop];
      return typeof value === "function" ? value.bind(target) : value;
    },
  };

  return new Proxy(client, handler) as Client;
};

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
