const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    res.status(201).json({
      status: "success",
      data: {
        token,
        userName: user.name
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    const err = new Error("Email can not correct");
    err.statusCode = 400;
    return next(err);
  }
  if (bcrypt.compareSync(req.body.password, user.password)) {
    // req.body.password is password da duoc ma hoa
    // user.password is real password
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    res.status(200).json({
      status: "success",
      data: {
        token,
        userName: user.name
      }
    });
  } else {
    const err = new Error("Password can not correct");
    err.statusCode = 400;
    return next(err);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const data = { user: null };
    if (req.user) {
      const user = await userModel.findOne({ _id: req.user.userId });
      data.user = { userName: user.name };
    }
    res.status(200).json({
      status: "success",
      data: data
    });
  } catch (error) {
    res.json(error);
  }
};
