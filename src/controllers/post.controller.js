const postModel = require("../models/post.model");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await postModel
      .find({})
      .populate("author", "name password")
      .select("content createdAt");
    res.status(200).json({
      status: "success",
      result: posts.length,
      data: {
        posts
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createOnePost = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const posts = await postModel.create({ ...req.body, author: userId });
    res.status(200).json({
      status: "success",
      result: posts.length,
      data: {
        posts
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePostByID = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findByIdAndUpdate(
      postId,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        post
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePostByID = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await postModel.findByIdAndDelete(postId);
    res.status(200).json({
      status: "success",
      d,
      message: "Post has been deleted"
    });
  } catch (error) {
    next(error);
  }
};
