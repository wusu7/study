import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts); // /api/v1/posts/
router.get("/:id", getPostById); // /api/v1/posts/1
router.post("/", createPost);
router.put("/:id", updatePost); // localhost:3000/posts/1
router.delete("/:id", deletePost);

export default router;