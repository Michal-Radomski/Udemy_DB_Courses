import express, { Router, Request, Response } from "express";

const indexRouter: Router = express.Router();

// Test Route
indexRouter.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>Server is running</h1>");
});

indexRouter.get("/users", async (_req: Request, _res: Response) => {});

indexRouter.get("/users/:id", async (_req: Request, _res: Response) => {});

indexRouter.post("/users", async (_req: Request, _res: Response) => {});

indexRouter.put("/users/:id", async (_req: Request, _res: Response) => {});

indexRouter.delete("/users/:id", async (_req: Request, _res: Response) => {});

export default indexRouter;
