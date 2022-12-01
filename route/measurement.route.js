import express from "express";
import measurementConnection from "../model/measurement.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const measurement = express.Router();
const useModel = measurementConnection;
const useMessage = "measurement";

// measurement.get("/:useID", async (req, res) => {
//   try {
//     const mongoData = await useModel
//       .find({ newMemberId: req.params.useID })
//       .sort("dateOfMeasurement");

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

// measurement.post("/", async (req, res) => {
//   let useBody = {
//     newMemberId: req.body.newMemberId,
//     photo: req.body.photo,
//     dateOfMeasurement: req.body.dateOfMeasurement,
//     weight: req.body.weight,
//     height: req.body.height,
//     neck: req.body.neck,
//     shoulder: req.body.shoulder,
//     chestExtended: req.body.chestExtended,
//     chestNormal: req.body.chestNormal,
//     foreArms: req.body.foreArms,
//     biceps: req.body.biceps,
//     wrist: req.body.wrist,
//     upperAbs: req.body.upperAbs,
//     lowerAbs: req.body.lowerAbs,
//     waist: req.body.waist,
//     hips: req.body.hips,
//     thighs: req.body.thighs,
//     calves: req.body.calves,
//     ankles: req.body.ankles,
//     bloodPressure: req.body.bloodPressure,
//     sugarLevel: req.body.sugarLevel,
//     fats: req.body.fats,
//     bmi: req.body.bmi,
//     bmr: req.body.bmr,
//     medicalHistory: req.body.medicalHistory,
//   };
//   mongoSave(res, useModel, useMessage, useBody);
// });

measurement.put("/:useID", async (req, res) => {
  let useBody = {
    photo: req.body.photo,
    dateOfMeasurement: req.body.dateOfMeasurement,
    weight: req.body.weight,
    height: req.body.height,
    neck: req.body.neck,
    shoulder: req.body.shoulder,
    chestExtended: req.body.chestExtended,
    chestNormal: req.body.chestNormal,
    foreArms: req.body.foreArms,
    biceps: req.body.biceps,
    wrist: req.body.wrist,
    upperAbs: req.body.upperAbs,
    lowerAbs: req.body.lowerAbs,
    waist: req.body.waist,
    hips: req.body.hips,
    thighs: req.body.thighs,
    calves: req.body.calves,
    ankles: req.body.ankles,
    bloodPressure: req.body.bloodPressure,
    sugarLevel: req.body.sugarLevel,
    fats: req.body.fats,
    bmi: req.body.bmi,
    bmr: req.body.bmr,
    medicalHistory: req.body.medicalHistory,
  };
  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// measurement.delete("/:useID", async (req, res) => {
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

export default measurement;
