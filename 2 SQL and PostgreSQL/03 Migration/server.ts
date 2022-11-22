import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import pg from "pg";

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "social_network",
  user: process.env.user,
  password: process.env.password,
});

// console.log({ pool });

// The server
const app: Express = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));

app.get("/posts", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  const { rows } = await pool.query(`
    SELECT * FROM posts;
  `);

  res.send(`
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>lng</th>
          <th>lat</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => {
            return `
            <tr>
              <td>${row.id}</td>
              <td>${row.lng}</td>
              <td>${row.lat}</td>
            </tr>
          `;
          })
          .join("")}
      </tbody>
    </table>
    </hr>
    <form method="POST">
      <h3>Create Post</h3>
      <div>
        <label>Lng</label>
        <input name="lng" />
      </div>
      <div>
        <label>Lat</label>
        <input name="lat" />
      </div>
      <button type="submit">Create</button>
    </form>
  `);
});

app.post("/posts", async (req: Request, res: Response) => {
  const { lng, lat } = req.body;

  await pool.query("INSERT INTO posts (lat, lng, loc) VALUES ($1, $2, $3);", [lat, lng, `(${lng}, ${lat})`]);

  res.redirect("/posts");
});

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({ port: port }, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
