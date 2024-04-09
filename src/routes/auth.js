const express = require("express");
const {
  register,
  login,
  getCurrentUser
} = require("../controllers/auth.controller");

const { checkCurrentUser } = require("../middlewares/checkCurrentUser");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/", checkCurrentUser, getCurrentUser);

module.exports = authRouter;
