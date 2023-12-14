import express from "express";
import PingController from "../controllers/ping";
import PostRouter from "./post.router";
import UserRouter from "./user.router";
import CommentRouter from "./comment.router";
import AuthRouter from "./auth.router"; // Imported AuthRouter

import userAuth from "../middleware/userAuth";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/auth", AuthRouter); // Use AuthRouter for authentication routes
router.use("/users", UserRouter);
router.use("/posts", userAuth, PostRouter);
router.use("/comments", userAuth, CommentRouter);

export default router;
