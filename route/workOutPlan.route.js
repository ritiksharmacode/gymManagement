import express from "express";
import workOutPlanConnection from "../model/workOutPlan.model.js";

const workOutPlan = express.Router();
const useModel = workOutPlanConnection;
const useMessage = "workOutPlan";

workOutPlan.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("workOutPlanName");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

workOutPlan.post("/", async (req, res) => {
  try {
    let workOutPlanData = {
      photo: req.body.photo,
      newMemberId: req.body.newMemberId,
      workOutPlanName: req.body.workOutPlanName,
      mondayWorkOut: req.body.mondayWorkOut,
      tuesdayWorkOut: req.body.tuesdayWorkOut,
      wednesdayWorkOut: req.body.wednesdayWorkOut,
      thursdayWorkOut: req.body.thursdayWorkOut,
      fridayWorkOut: req.body.fridayWorkOut,
      saturdayWorkOut: req.body.saturdayWorkOut,
      sundayWorkOut: req.body.sundayWorkOut,
    };

    const newWorkOutPlan = new useModel(workOutPlanData);
    let saveData = await newWorkOutPlan.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

workOutPlan.put("/:useID", async (req, res) => {
  try {
    let workOutPlanData = {
      photo: req.body.photo,
      newMemberId: req.body.newMemberId,
      workOutPlanName: req.body.workOutPlanName,
      mondayWorkOut: req.body.mondayWorkOut,
      tuesdayWorkOut: req.body.tuesdayWorkOut,
      wednesdayWorkOut: req.body.wednesdayWorkOut,
      thursdayWorkOut: req.body.thursdayWorkOut,
      fridayWorkOut: req.body.fridayWorkOut,
      saturdayWorkOut: req.body.saturdayWorkOut,
      sundayWorkOut: req.body.sundayWorkOut,
    };

    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      workOutPlanData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

workOutPlan.delete("/:useID", async (req, res) => {
  try {
    let saveData = await useModel.deleteOne({
      _id: req.params.useID,
    });
    res.status(201).json({ message: `${useMessage} deleted`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

export default workOutPlan;
