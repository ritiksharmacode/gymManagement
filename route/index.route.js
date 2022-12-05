import express from "express";

import jwt from "jsonwebtoken";

import entryPoint from "../route/entryPoint.route.js";
import authStaff from "../route/authStaff.route.js";

import staffInfoConnection from "../model/staffInfo.model.js";

import common from "../route/common.route.js";

import { jwtSecretKey } from "../utils/common.utils.js";

const router = express.Router();

let checkStaffToken = async (req, res, next) => {
  try {
    let receivedToken = req.header("authorization");
    receivedToken = receivedToken && receivedToken.split(" ")[1];
    const isAuthorized = jwt.verify(receivedToken, jwtSecretKey);

    let staffData = await staffInfoConnection
      .findOne({
        $and: [
          { _id: isAuthorized.staffID },
          { "loginToken.token": receivedToken },
        ],
      })
      .lean();

    if (!staffData) {
      throw "invalid token";
    }

    console.log("middleware");
    req.header.staffID = isAuthorized.staffID;

    next();
  } catch (error) {
    console.log("hello");
    return res.status(403).json({ message: error });
  }
};

router.use("/entryPoint", entryPoint);

router.use("/authStaff", checkStaffToken, authStaff);

router.use("/common", checkStaffToken, common);

export default router;
