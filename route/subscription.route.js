import express from "express";
import subscriptionConnection from "../model/subscription.model.js";

const subscription = express.Router();
const useModel = subscriptionConnection;
const useMessage = "subscription";

subscription.get("/:useID", async (req, res) => {
  try {
    const mongoData = await useModel
      .find({ newMemberId: req.params.useID })
      .sort("membershipFrom");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

subscription.post("/", async (req, res) => {
  try {
    let subscriptionData = {
      newMemberId: req.body.newMemberId,
      registrationFee: req.body.registrationFee,
      membershipPackage: req.body.membershipPackage,
      basicPrice: req.body.basicPrice,
      gstPrice: req.body.gstPrice,
      netPrice: req.body.netPrice,
      discount: req.body.discount,
      netPayable: req.body.netPayable,
      membershipFrom: req.body.membershipFrom,
      membershipTill: req.body.membershipTill,
      remarks: req.body.remarks,
    };

    const newSubscription = new useModel(subscriptionData);
    let saveData = await newSubscription.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

subscription.put("/:useID", async (req, res) => {
  try {
    let subscriptionData = {
      newMemberId: req.body.newMemberId,
      registrationFee: req.body.registrationFee,
      membershipPackage: req.body.membershipPackage,
      basicPrice: req.body.basicPrice,
      gstPrice: req.body.gstPrice,
      netPrice: req.body.netPrice,
      discount: req.body.discount,
      netPayable: req.body.netPayable,
      membershipFrom: req.body.membershipFrom,
      membershipTill: req.body.membershipTill,
      remarks: req.body.remarks,
    };

    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      subscriptionData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

subscription.delete("/:useID", async (req, res) => {
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

export default subscription;
