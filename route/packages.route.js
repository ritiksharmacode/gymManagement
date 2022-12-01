import express from "express";
import packagesConnection from "../model/packages.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const packages = express.Router();
const useModel = packagesConnection;
const useMessage = "packages";

// packages.get("/", async (req, res) => {
//   try {
//     const mongoData = await useModel.find({}).sort("packageName");

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

// packages.post("/", async (req, res) => {
//   let useBody = {
//     photo: req.body.photo,
//     packageName: req.body.packageName,
//     packageDetails: req.body.packageDetails,
//     packageDurationUnit: req.body.packageDurationUnit,
//     packageDuration: req.body.packageDuration,
//     packagePrice: req.body.packagePrice,
//     selectGst: req.body.selectGst,
//     HSN: req.body.HSN,
//   };

//   mongoSave(res, useModel, useMessage, useBody);
// });

packages.put("/:useID", async (req, res) => {
  let useBody = {
    photo: req.body.photo,
    packageName: req.body.packageName,
    packageDetails: req.body.packageDetails,
    packageDurationUnit: req.body.packageDurationUnit,
    packageDuration: req.body.packageDuration,
    packagePrice: req.body.packagePrice,
    selectGst: req.body.selectGst,
    HSN: req.body.HSN,
  };

  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// packages.delete("/:useID", async (req, res) => {
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

export default packages;
