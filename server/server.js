require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const userDetailsRoutes = require("./routes/userDetailsRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  console.log(req.path, req.method);
  next();
});

app.use("/api/userDetails", userDetailsRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
