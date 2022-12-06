import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gymInfoConnection from "../model/gymInfo.model";
import staffInfoConnection from "../model/staffInfo.model";
import accessLevelConnection from "../model/accessLevel.model";
import { jwtSecretKey } from "../utils/common.utils";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils";

const entryPoint = express.Router();

entryPoint.post("/signUp", async (req, res) => {
  try {
    console.log(req.body);

    let signUpData = {
      gymContact: req.body.gymContact,
      gymName: req.body.gymName,
      gymEmailId: req.body.gymEmailId,
      gymAddress: req.body.gymAddress,
      state: req.body.state,
      country: req.body.country,
    };
    const newGymInfo = new gymInfoConnection(signUpData);
    let saveData1 = await newGymInfo.save();

    let accessLevelData = {
      accessLevelName: "Master",
    };
    const newAccessLevel = new accessLevelConnection(accessLevelData);
    let saveData2 = await newAccessLevel.save();

    const bcryptPassword = await bcrypt.hash(`${req.body.gymContact}`, 12);

    let staffInfoData = {
      accessLevelName: saveData2._id,
      name: "Master User",
      gymContact: req.body.gymContact,
      password: bcryptPassword,
    };
    const newStaffInfo = new staffInfoConnection(staffInfoData);
    let saveData3 = await newStaffInfo.save();

    res.status(201).json({
      message: "new gymInfo saved",
      data: saveData3,
    });
  } catch (error: any) {
    console.log("save error", error);
    res.status(400).json({ message: error.message });
  }
});

entryPoint.post("/login", async (req, res) => {
  try {
    console.log(req.body);

    let saveData = await staffInfoConnection
      .findOne({
        gymContact: req.body.userName,
      })
      .lean();

    if (!saveData) {
      throw "gymInfo not registered";
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      saveData.password
    );

    if (!isPasswordMatch) {
      throw "invalid credential";
    }

    const payLoad = { staffID: saveData._id };
    const token = jwt.sign(payLoad, jwtSecretKey);

    await staffInfoConnection.updateOne(
      { _id: saveData._id },
      {
        $addToSet: {
          loginToken: { token: token },
        },
      }
    );

    res.status(201).json({
      message: " login successful",
      data: {
        token,
        gymContact: saveData.gymContact,
      },
    });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

entryPoint.put("/forgetPassword", async (req, res) => {
  try {
    const bcryptPassword = await bcrypt.hash(`${req.body.password}`, 12);
    let saveData = await staffInfoConnection.updateOne(
      { gymContact: req.body.userName },
      {
        password: bcryptPassword,
      }
    );
    res.status(201).json({ message: "new password success ", data: saveData });
  } catch (error: any) {
    console.log("save error", error);
    res.status(400).json({ message: error.message });
  }
});

export default entryPoint;
