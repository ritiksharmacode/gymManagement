import express from "express";
import purposeConnection from "../model/purpose.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const purpose = express.Router();
const useModel = purposeConnection;
const useMessage = "purpose";

// purpose.get("/", async (req, res) => {
//   try {
//     const mongoData = await useModel.find({}).sort("purposeName");

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

// purpose.post("/", async (req, res) => {
//   let useBody = {
//     photo: req.body.photo,
//     purposeName: req.body.purposeName,
//     mondayWorkOut: req.body.mondayWorkOut,
//     tuesdayWorkOut: req.body.tuesdayWorkOut,
//     wednesdayWorkOut: req.body.wednesdayWorkOut,
//     thursdayWorkOut: req.body.thursdayWorkOut,
//     fridayWorkOut: req.body.fridayWorkOut,
//     saturdayWorkOut: req.body.saturdayWorkOut,
//     sundayWorkOut: req.body.sundayWorkOut,
//     mondayDiet: req.body.mondayDiet,
//     tuesdayDiet: req.body.tuesdayDiet,
//     wednesdayDiet: req.body.wednesdayDiet,
//     thursdayDiet: req.body.thursdayDiet,
//     fridayDiet: req.body.fridayDiet,
//     saturdayDiet: req.body.saturdayDiet,
//     sundayDiet: req.body.sundayDiet,
//   };

//   mongoSave(res, useModel, useMessage, useBody);
// });

purpose.put("/:useID", async (req, res) => {
  let useBody = {
    photo: req.body.photo,
    purposeName: req.body.purposeName,
    mondayWorkOut: req.body.mondayWorkOut,
    tuesdayWorkOut: req.body.tuesdayWorkOut,
    wednesdayWorkOut: req.body.wednesdayWorkOut,
    thursdayWorkOut: req.body.thursdayWorkOut,
    fridayWorkOut: req.body.fridayWorkOut,
    saturdayWorkOut: req.body.saturdayWorkOut,
    sundayWorkOut: req.body.sundayWorkOut,
    mondayDiet: req.body.mondayDiet,
    tuesdayDiet: req.body.tuesdayDiet,
    wednesdayDiet: req.body.wednesdayDiet,
    thursdayDiet: req.body.thursdayDiet,
    fridayDiet: req.body.fridayDiet,
    saturdayDiet: req.body.saturdayDiet,
    sundayDiet: req.body.sundayDiet,
  };
  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// purpose.delete("/:useID", async (req, res) => {
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

export default purpose;
