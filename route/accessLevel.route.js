import express from "express";
import accessLevelConnection from "../model/accessLevel.model.js";

const accessLevel = express.Router();
const useModel = accessLevelConnection;
const useMessage = "accessLevel";

accessLevel.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("accessLevelName");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

accessLevel.post("/", async (req, res) => {
  try {
    let accessLevelData = {
      accessLevelName: req.body.accessLevelName,
    };
    const newAccessLevel = new useModel(accessLevelData);
    let saveData = await newAccessLevel.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

accessLevel.put("/:useID", async (req, res) => {
  try {
    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      {
        accessLevelName: req.body.accessLevelName,
      }
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

accessLevel.delete("/:useID", async (req, res) => {
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

export default accessLevel;
