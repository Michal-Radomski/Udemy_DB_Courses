import express, { Express } from "express";

// Import routes
import indexRouter from "./indexRouter";

// The server
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Route middleware
app.use("/", indexRouter);

export default app;
