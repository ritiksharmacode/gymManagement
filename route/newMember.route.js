import express from "express";
import newMemberConnection from "../model/newMember.model.js";

const newMember = express.Router();
const useModel = newMemberConnection;
const useMessage = "newMember";

newMember.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("name");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

newMember.post("/", async (req, res) => {
  try {
    let newMemberData = {
      photo: req.body.photo,
      contact: req.body.contact,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      additionalContact: req.body.additionalContact,
      emailId: req.body.emailId,
      occupation: req.body.occupation,
      address: req.body.address,
      postcode: req.body.postcode,
      state: req.body.state,
      city: req.body.city,
      country: req.body.country,
      FavourOf: req.body.FavourOf,
      FavourName: req.body.FavourName,
      purposeOfJoining: req.body.purposeOfJoining,
      bloodGroup: req.body.bloodGroup,
      maritalStatus: req.body.maritalStatus,
      dateOfAnniversary: req.body.dateOfAnniversary,
      query: req.body.query,
      biometric: req.body.biometric,
      referredBy: req.body.referredBy,
      response: req.body.response,
      interestInPackage: req.body.interestInPackage,
      followUpDate: req.body.followUpDate,
      followUpStatus: req.body.followUpStatus,
      entryStatus: req.body.entryStatus,
    };

    const newNewMember = new useModel(newMemberData);
    let saveData = await newNewMember.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

newMember.put("/:useID", async (req, res) => {
  try {
    let newMemberData = {
      photo: req.body.photo,
      contact: req.body.contact,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      additionalContact: req.body.additionalContact,
      emailId: req.body.emailId,
      occupation: req.body.occupation,
      address: req.body.address,
      postcode: req.body.postcode,
      state: req.body.state,
      city: req.body.city,
      country: req.body.country,
      FavourOf: req.body.FavourOf,
      FavourName: req.body.FavourName,
      purposeOfJoining: req.body.purposeOfJoining,
      bloodGroup: req.body.bloodGroup,
      maritalStatus: req.body.maritalStatus,
      dateOfAnniversary: req.body.dateOfAnniversary,
      query: req.body.query,
      biometric: req.body.biometric,
      referredBy: req.body.referredBy,
      response: req.body.response,
      interestInPackage: req.body.interestInPackage,
      followUpDate: req.body.followUpDate,
      followUpStatus: req.body.followUpStatus,
      entryStatus: req.body.entryStatus,
    };

    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      newMemberData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

newMember.delete("/:useID", async (req, res) => {
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

export default newMember;
