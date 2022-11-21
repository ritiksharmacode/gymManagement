import express from "express";
import staffInfoConnection from "../model/staffInfo.model.js";

const staffInfo = express.Router();
const useModel = staffInfoConnection;
const useMessage = "staffInfo";

staffInfo.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("name");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

staffInfo.post("/", async (req, res) => {
  try {
    const bcryptPassword = await bcrypt.hash(`${req.body.gymContact}`, 12);
    let staffInfoData = {
      photo: req.body.photo,
      accessLevelName: req.body.accessLevelName,
      name: req.body.name,
      gymContact: req.body.gymContact,
      password: bcryptPassword,
    };

    const newStaffInfo = new useModel(staffInfoData);
    let saveData = await newStaffInfo.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

staffInfo.put("/:useID", async (req, res) => {
  try {
    let staffInfoData = {
      photo: req.body.photo,
      accessLevelName: req.body.accessLevelName,
      name: req.body.name,
      gymContact: req.body.gymContact,
      // password: req.body.password,
    };

    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      staffInfoData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

staffInfo.delete("/:useID", async (req, res) => {
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

export default staffInfo;
