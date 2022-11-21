import express from "express";

import staffInfoConnection from "../model/staffInfo.model.js";
import jwt from "jsonwebtoken";
import accessLevel from "../route/accessLevel.route.js";
import accounts from "../route/accounts.route.js";
import entryPoint from "../route/entryPoint.route.js";
import authStaff from "../route/authStaff.route.js";
import exercise from "../route/exercise.route.js";
import exercisePlan from "../route/exercisePlan.route.js";
import measurement from "../route/measurement.route.js";
import media from "../route/media.route.js";
import newMember from "../route/newMember.route.js";
import nutritionChart from "../route/nutritionChart.route.js";
import packages from "../route/packages.route.js";
import paymentMethod from "../route/paymentMethod.route.js";
import purpose from "../route/purpose.route.js";
import staffInfo from "../route/staffInfo.route.js";
import subscription from "../route/subscription.route.js";
import workOutPlan from "../route/workOutPlan.route.js";

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
    return res.status(403).json({ message: error });
  }
};

router.use("/entryPoint", entryPoint);
router.use("/accessLevel", checkStaffToken, accessLevel);
router.use("/authStaff", checkStaffToken, authStaff);
router.use("/accounts", checkStaffToken, accounts);
router.use("/exercise", checkStaffToken, exercise);
router.use("/exercisePlan", checkStaffToken, exercisePlan);
router.use("/measurement", checkStaffToken, measurement);
router.use("/media", checkStaffToken, media);
router.use("/newMember", checkStaffToken, newMember);
router.use("/nutritionChart", checkStaffToken, nutritionChart);
router.use("/packages", checkStaffToken, packages);
router.use("/paymentMethod", checkStaffToken, paymentMethod);
router.use("/packages", checkStaffToken, packages);
router.use("/purpose", checkStaffToken, purpose);
router.use("/staffInfo", checkStaffToken, staffInfo);
router.use("/subscription", checkStaffToken, subscription);
router.use("/workOutPlan", checkStaffToken, workOutPlan);

export default router;
