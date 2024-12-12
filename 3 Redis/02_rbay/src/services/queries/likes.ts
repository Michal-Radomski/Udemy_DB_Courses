import { client } from "$services/redis";
import { userLikesKey, itemsKey } from "$services/keys";
import { getItems } from "./items";

export const userLikesItem = async (itemId: string, userId: string): Promise<boolean> => {
  return client.sIsMember(userLikesKey(userId), itemId);
};

export const likedItems = async (userId: string) => {
  // Fetch all the item ID's from this user's liked set
  const ids: string[] = await client.sMembers(userLikesKey(userId));

  // Fetch all the item hashes with those ids and return as array
  return getItems(ids);
};

export const likeItem = async (itemId: string, userId: string) => {
  const inserted: number = await client.sAdd(userLikesKey(userId), itemId);

  if (inserted) {
    return client.hIncrBy(itemsKey(itemId), "likes", 1);
  }
};

export const unlikeItem = async (itemId: string, userId: string) => {
  const removed: number = await client.sRem(userLikesKey(userId), itemId);

  if (removed) {
    return client.hIncrBy(itemsKey(itemId), "likes", -1);
  }
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {
  const ids: string[] = await client.sInter([userLikesKey(userOneId), userLikesKey(userTwoId)]);

  return getItems(ids);
};
