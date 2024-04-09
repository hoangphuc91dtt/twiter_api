var express = require("express");
const {
  getAllPosts,
  createOnePost,
  updatePostByID,
  deletePostByID
} = require("../controllers/post.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.post("/", verifyToken, createOnePost);
postRouter.put("/:postId", verifyToken, updatePostByID);
postRouter.delete("/:postId", verifyToken, deletePostByID);
module.exports = postRouter;
