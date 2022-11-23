import * as dotenv from "dotenv";
dotenv.config();
const request = require("supertest");

import buildApp from "../app";
import UserRepo from "../repo/user-repo";
import pool from "../pool";

beforeAll(() => {
  return pool.connect({
    host: "localhost",
    port: 5432,
    database: "social_network-test",
    user: process.env.user,
    password: process.env.password,
  });
});

afterAll(() => {
  return pool.close();
});

it("Create a user", async () => {
  const startingCount = await UserRepo.count();
  // expect(startingCount).toEqual(0);
  // console.log({ startingCount });

  await request(buildApp).post("/users").send({ username: "test-user", bio: "test bio" }).expect(201);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
