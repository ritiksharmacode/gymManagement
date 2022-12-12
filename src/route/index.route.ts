import express, { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import entryPoint from "./entryPoint.route";
import authStaff from "./authStaff.route";

import staffInfoConnection from "../model/staffInfo.model";

import common from "./common.route";
import member from "./member.route";
import reports from "./reports.route";

import { jwtSecretKey } from "../utils/common.utils";

const router = express.Router();

declare module 'jsonwebtoken' {
  export interface CustomPayload extends jwt.JwtPayload {
    staffID: string
  }
}

declare global {
  namespace Express {
    export interface Request {
      staffID?: string
    }
  }
}


let checkStaffToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let receivedToken: string = req.header("authorization") || "";
    receivedToken = (receivedToken && receivedToken.split(" ")[1]) || "";
    const { staffID } = <jwt.CustomPayload>jwt.verify(receivedToken, jwtSecretKey);

    let staffData = await staffInfoConnection
      .findOne({
        $and: [
          { _id: staffID },
          { "loginToken.token": receivedToken },
        ],
      })
      .lean();

    if (!staffData) {
      throw "invalid token";
    }

    console.log("middleware");
    req.staffID = staffID;

    next();
  } catch (error) {
    console.log("hello");
    return res.status(403).json({ message: error });
  }
};

router.use("/entryPoint", entryPoint);

router.use("/authStaff", checkStaffToken, authStaff);

router.use("/common", checkStaffToken, common);
router.use("/member", checkStaffToken, member);
router.use("/reports", checkStaffToken, reports);

export default router;
