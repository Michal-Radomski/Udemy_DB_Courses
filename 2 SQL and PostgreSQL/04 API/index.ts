import * as dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
import pool from "./src/pool";

// Port
const port = (process.env.PORT || 5000) as number;

pool
  .connect({
    host: "localhost",
    port: 5432,
    database: "social_network",
    user: process.env.user,
    password: process.env.password,
  })
  .then(() => {
    app.listen({ port: port }, () => {
      console.log(`Server is listening at http://localhost:${port}`);
      // For testing only
      console.log("Current Time:", new Date().toLocaleTimeString());
    });
  })
  .catch((err) => console.error({ err }));
