import "dotenv/config";

import { client } from "../src/services/redis";

const run = async (): Promise<void> => {
  await client.hSet("car2", {
    color: "red",
    year: 1950,
    // engine: { cylinders: 8 }, [object Object]
    // owner: null,    //* null.toString()
    // service: undefined, //* undefined.toString()
    // owner: null || "",
    // service: undefined || ""
  });

  const car2 = await client.hGetAll("car2");

  //* Because if id desn't exists redis return {}!
  if (Object.keys(car2).length === 0) {
    console.log("Car not found, respond with 404");
    return;
  }

  console.log("car2:", car2);
};
run();
