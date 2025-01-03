import { client } from "$services/redis";
import { itemsKey, itemsByEndingAtKey } from "$services/keys";
import { deserialize } from "./deserialize";

//* Error here?
export const itemsByEndingTime = async (order: "DESC" | "ASC" = "DESC", offset = 0, count = 10) => {
  const ids = await client.zRangeByScore(itemsByEndingAtKey(), "-inf", "+inf", {
    // BY: 'SCORE',
    LIMIT: {
      offset,
      count,
    },
  });
  // console.log({ ids });

  const results = await Promise.all(ids?.map((id) => client?.hGetAll(itemsKey(id))));
  // console.log("results:", results);

  return results.map((item, i) => deserialize(ids[i], item));
};
