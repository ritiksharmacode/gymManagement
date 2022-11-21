import express from "express";
import exercisePlanConnection from "../model/exercisePlan.model.js";

const exercisePlan = express.Router();
const useModel = exercisePlanConnection;
const useMessage = "exercisePlan";

exercisePlan.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("exercisePlanName");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

exercisePlan.post("/", async (req, res) => {
  try {
    let exercisePlanData = {
      photo: req.body.photo,
      exercisePlanName: req.body.exercisePlanName,
      exercisePlan: req.body.exercisePlan,
    };
    const newExercisePlan = new useModel(exercisePlanData);
    let saveData = await newExercisePlan.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

exercisePlan.put("/:useID", async (req, res) => {
  try {
    let exercisePlanData = {
      photo: req.body.photo,
      exercisePlanName: req.body.exercisePlanName,
      exercisePlan: req.body.exercisePlan,
    };
    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      exercisePlanData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

exercisePlan.delete("/:useID", async (req, res) => {
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

export default exercisePlan;
