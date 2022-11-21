import express from "express";
import exerciseConnection from "../model/exercise.model.js";

const exercise = express.Router();
const useModel = exerciseConnection;
const useMessage = "exercise";

exercise.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("exerciseName");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

exercise.post("/", async (req, res) => {
  try {
    let exerciseData = {
      photo: req.body.photo,
      exerciseName: req.body.exerciseName,
      exerciseDescription: req.body.exerciseDescription,
    };
    const newExercise = new useModel(exerciseData);
    let saveData = await newExercise.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

exercise.put("/:useID", async (req, res) => {
  try {
    let exerciseData = {
      photo: req.body.photo,
      exerciseName: req.body.exerciseName,
      exerciseDescription: req.body.exerciseDescription,
    };
    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      exerciseData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

exercise.delete("/:useID", async (req, res) => {
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

export default exercise;
