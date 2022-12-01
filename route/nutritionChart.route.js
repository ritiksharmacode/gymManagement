import express from "express";
import nutritionChartConnection from "../model/nutritionChart.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const nutritionChart = express.Router();
const useModel = nutritionChartConnection;
const useMessage = "nutritionChart";

// nutritionChart.get("/:useID", async (req, res) => {
//   try {
//     const mongoData = await useModel.find({ newMemberId: req.params.useID });

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

// nutritionChart.post("/", async (req, res) => {
//   let useBody = {
//     newMemberId: req.body.newMemberId,
//     photo: req.body.photo,
//     purposeName: req.body.purposeName,
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

nutritionChart.put("/:useID", async (req, res) => {
  let useBody = {
    newMemberId: req.body.newMemberId,
    photo: req.body.photo,
    purposeName: req.body.purposeName,
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

// nutritionChart.delete("/:useID", async (req, res) => {
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

export default nutritionChart;
