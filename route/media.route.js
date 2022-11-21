import express from "express";
import mediaConnection from "../model/media.model.js";

const media = express.Router();
const useModel = mediaConnection;
const useMessage = "media";

media.get("/:useID", async (req, res) => {
  try {
    const mongoData = await useModel
      .find({ newMemberId: req.params.useID })
      .sort("date");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

media.post("/", async (req, res) => {
  try {
    let mediaData = {
      newMemberId: req.body.newMemberId,
      photo: req.body.photo,
      date: req.body.date,
      remarks: req.body.remarks,
    };
    const newMedia = new useModel(mediaData);
    let saveData = await newMedia.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

media.put("/:useID", async (req, res) => {
  try {
    let mediaData = {
      photo: req.body.photo,
      date: req.body.date,
      remarks: req.body.remarks,
    };
    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      mediaData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

media.delete("/:useID", async (req, res) => {
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

export default media;
