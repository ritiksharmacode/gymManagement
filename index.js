import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import router from "./route/index.route.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

const start = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/gymEDiary", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("connected successfully");
    });
    app.listen(process.env.PORT_NO, () =>
      console.log("Server started on port " + process.env.PORT_NO)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
