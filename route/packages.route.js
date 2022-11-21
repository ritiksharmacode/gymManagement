import express from "express";
import packagesConnection from "../model/packages.model.js";
import { mongoSave } from "../utils/mongo.utils.js";

const packages = express.Router();
const useModel = packagesConnection;
const useMessage = "packages";

packages.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("packageName");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

packages.post("/", async (req, res) => {
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

  mongoSave(res, useModel, useMessage, useBody);
});

packages.put("/:useID", async (req, res) => {
  try {
    let packagesData = {
      photo: req.body.photo,
      packageName: req.body.packageName,
      packageDetails: req.body.packageDetails,
      packageDurationUnit: req.body.packageDurationUnit,
      packageDuration: req.body.packageDuration,
      packagePrice: req.body.packagePrice,
      selectGst: req.body.selectGst,
      HSN: req.body.HSN,
    };

    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      packagesData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

packages.delete("/:useID", async (req, res) => {
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

export default packages;
