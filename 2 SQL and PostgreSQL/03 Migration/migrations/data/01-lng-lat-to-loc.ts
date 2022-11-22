import * as dotenv from "dotenv";
dotenv.config();
import pg from "pg";

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "social_network",
  user: process.env.user,
  password: process.env.password,
});

pool
  .query(
    `
  UPDATE posts
  SET loc = POINT(lng, lat)
  WHERE loc IS NULL;
`
  )
  .then(() => {
    console.log("Update complete");
    pool.end();
  })
  .catch((err) => console.error(err.message));
