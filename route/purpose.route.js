import express from "express";
import purposeConnection from "../model/purpose.model.js";

const purpose = express.Router();
const useModel = purposeConnection;
const useMessage = "purpose";

purpose.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("purposeName");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

purpose.post("/", async (req, res) => {
  try {
    let purposeData = {
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

    const newPurpose = new useModel(purposeData);
    let saveData = await newPurpose.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

purpose.put("/:useID", async (req, res) => {
  try {
    let purposeData = {
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

    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      purposeData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

purpose.delete("/:useID", async (req, res) => {
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

export default purpose;
