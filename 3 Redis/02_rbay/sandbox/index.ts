import "dotenv/config";

import { client } from "../src/services/redis";

// const run = async (): Promise<void> => {
//   await client.hSet("car2", {
//     color: "red",
//     year: 1950,
//     // engine: { cylinders: 8 }, [object Object]
//     // owner: null,    //* null.toString()
//     // service: undefined, //* undefined.toString()
//     // owner: null || "",
//     // service: undefined || ""
//   });

//   const car2 = await client.hGetAll("car2");

//   //* Because if id desn't exists redis return {}!
//   if (Object.keys(car2).length === 0) {
//     console.log("Car not found, respond with 404");
//     return;
//   }

//   console.log("car2:", car2);
// };
// run();

const run = async (): Promise<void> => {
  await client.hSet("car1", {
    color: "red",
    year: 1950,
  });
  await client.hSet("car2", {
    color: "green",
    year: 1955,
  });
  await client.hSet("car3", {
    color: "blue",
    year: 1960,
  });

  const commands = [1, 2, 3].map((id) => {
    return client.hGetAll("car" + id);
  });
  // console.log("commands:", commands);

  const results = await Promise.all(commands);

  console.log("results:", results);
};
run();
