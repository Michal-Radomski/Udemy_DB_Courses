import express, { Router, Request, Response } from "express";

import UserRepo from "./repo/user-repo";

const indexRouter: Router = express.Router();

// Test Route
// indexRouter.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>Server is running</h1>");
// });

indexRouter.get("/users", async (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  const users = await UserRepo.find();
  res.status(200).send(users);
});

indexRouter.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserRepo.findById(id);
  // console.log("user[0]:", user[0]);

  if (Object.keys(user[0]).length === 0) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).send(user);
  }
});

indexRouter.post("/users", async (req: Request, res: Response) => {
  // console.log("req.body:", req.body);
  const { username, bio } = req.body;
  const user = await UserRepo.insert(username, bio);
  res.status(201).send(user);
});

indexRouter.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, bio } = req.body;
  const user = await UserRepo.update(id, username, bio);
  // console.log("user:", user);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).send(user);
  }
});

indexRouter.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserRepo.delete(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.status(200).send(user);
  }
});

export default indexRouter;
