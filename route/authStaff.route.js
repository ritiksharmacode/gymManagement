import express from "express";
import bcrypt from "bcrypt";
import staffInfoConnection from "../model/staffInfo.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const authorizedStaff = express.Router();

authorizedStaff.put("/", async (req, res) => {
  const bcryptPassword = await bcrypt.hash(`${req.body.password}`, 12);
  let useBody = {
    gymContact: req.body.userName,
    password: bcryptPassword,
  };
  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

authorizedStaff.delete("/", async (req, res) => {
  try {
    let receivedToken = req.header("authorization");
    receivedToken = receivedToken && receivedToken.split(" ")[1];

    await staffInfoConnection.updateOne(
      { "loginToken.token": receivedToken },
      {
        $pull: {
          loginToken: { token: receivedToken },
        },
      }
    );
    res.status(201).json({ message: "buyer logout", data: {} });
  } catch (error) {
    console.log("save error", error);
    res.status(400).json({ message: error.message });
  }
});

export default authorizedStaff;
