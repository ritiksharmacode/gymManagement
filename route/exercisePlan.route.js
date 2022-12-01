import express from "express";
import exercisePlanConnection from "../model/exercisePlan.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const exercisePlan = express.Router();
const useModel = exercisePlanConnection;
const useMessage = "exercisePlan";

// exercisePlan.get("/", async (req, res) => {
//   try {
//     const mongoData = await useModel.find({}).sort("exercisePlanName");

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

// exercisePlan.post("/", async (req, res) => {
//   let useBody = {
//     photo: req.body.photo,
//     exercisePlanName: req.body.exercisePlanName,
//     exercisePlan: req.body.exercisePlan,
//   };
//   mongoSave(res, useModel, useMessage, useBody);
// });

exercisePlan.put("/:useID", async (req, res) => {
  let useBody = {
    photo: req.body.photo,
    exercisePlanName: req.body.exercisePlanName,
    exercisePlan: req.body.exercisePlan,
  };
  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// exercisePlan.delete("/:useID", async (req, res) => {
//   try {
//     let saveData = await useModel.deleteOne({
//       _id: req.params.useID,
//     });
//     res.status(201).json({ message: `${useMessage} deleted`, data: saveData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error.message });
//   }
// });

export default exercisePlan;
