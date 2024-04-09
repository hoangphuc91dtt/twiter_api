const authRouter = require("./auth");
const postRouter = require("./post");

const appRouter = (app) => {
  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/auth", authRouter);
};

module.exports = appRouter;
