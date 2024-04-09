const { default: mongoose } = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("\x1b[32m", "Database connected!!"); // Màu xanh: \x1b[32m
  } catch (error) {
    console.log("\x1b[31m", "Database not connected!!"); // Màu đỏ: \x1b[31m
  }
}

module.exports = { connect };
