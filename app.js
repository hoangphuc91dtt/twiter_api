var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var app = express();

const db = require("./src/config/db");
const appRouter = require("./src/routes/index");
const { errorHandler } = require("./src/middlewares/errorHandler");
db.connect();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
appRouter(app);

//dotenv
require("dotenv").config();

//  Unhandled Route
app.all("*", (req, res, next) => {
  const err = new Error("The route can not be found");
  err.statusCode = 404;
  return next(err);
});
app.use(errorHandler);

const port = process.env.APP_POST;

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
module.exports = app;
