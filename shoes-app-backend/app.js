const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");
const routes = require("./routes");
const path = require("path");

const port = 3002;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(express.static("../shoes-app-frontend/dist"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("json spaces", 2);

app.use("/", routes);

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "..", "shoes-app-frontend", "dist", "index.html")
  );
});

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(async () => {
    console.log(chalk.green.bold("Connected to MongoDB"));

    app.listen(port, () => {
      console.log(chalk.green.bold(`Server has been started on port ${port}`));
    });
  })
  .catch((err) => {
    console.error(chalk.red.bold("Connection error:"), err);
  });
