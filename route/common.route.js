import express from "express";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

import accessLevelConnection from "../model/accessLevel.model.js";
import accountsConnection from "../model/accounts.model.js";
import exerciseConnection from "../model/exercise.model.js";
import exercisePlanConnection from "../model/exercisePlan.model.js";
import measurementConnection from "../model/measurement.model.js";
import mediaConnection from "../model/media.model.js";
import newMemberConnection from "../model/newMember.model.js";
import nutritionChartConnection from "../model/nutritionChart.model.js";
import packagesConnection from "../model/packages.model.js";
import paymentMethodConnection from "../model/paymentMethod.model.js";
import purposeConnection from "../model/purpose.model.js";
import staffInfoConnection from "../model/staffInfo.model.js";
import subscriptionConnection from "../model/subscription.model.js";
import workOutPlanConnection from "../model/workOutPlan.model.js";

const common = express.Router();
const useMessage = "common";

const allConnections = {
  accessLevel: accessLevelConnection,
  accounts: accountsConnection,
  exercise: exerciseConnection,
  exercisePlan: exercisePlanConnection,
  measurement: measurementConnection,
  media: mediaConnection,
  newMember: newMemberConnection,
  nutritionChart: nutritionChartConnection,
  packages: packagesConnection,
  paymentMethod: paymentMethodConnection,
  purpose: purposeConnection,
  staffInfo: staffInfoConnection,
  subscription: subscriptionConnection,
  workOutPlan: workOutPlanConnection,
};

common.post("/", async (req, res) => {
  try {
    const nowBody = req.body;

    const mongoData = await allConnections[nowBody.useModel]
      .find(nowBody.useWhere)
      .sort(nowBody.useSort);

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

common.post("/save", async (req, res) => {
  const nowBody = req.body;

  mongoSave(res, allConnections[nowBody.useModel], useMessage, nowBody.useData);
});

common.post("/delete", async (req, res) => {
  try {
    const nowBody = req.body;
    let saveData = await allConnections[nowBody.useModel].deleteOne(
      nowBody.useWhere
    );
    res.status(201).json({ message: `${useMessage} deleted`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

export default common;
