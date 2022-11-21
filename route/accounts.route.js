import express from "express";
import accountsConnection from "../model/accounts.model.js";

const accounts = express.Router();
const useModel = accountsConnection;
const useMessage = "accounts";

accounts.get("/:useID", async (req, res) => {
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

accounts.post("/", async (req, res) => {
  try {
    let accountsData = {
      newMemberId: req.body.newMemberId,
      photo: req.body.photo,
      date: req.body.date,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      remarks: req.body.remarks,
      entryType: req.body.entryType,
    };
    const newAccounts = new useModel(accountsData);
    let saveData = await newAccounts.save();
    res.status(201).json({ message: `new ${useMessage} save`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

accounts.put("/:useID", async (req, res) => {
  try {
    let accountsData = {
      photo: req.body.photo,
      date: req.body.date,
      amount: req.body.amount,
      remarks: req.body.remarks,
      entryType: req.body.entryType,
    };
    let saveData = await useModel.updateOne(
      { _id: req.params.useID },
      accountsData
    );
    res.status(201).json({ message: `${useMessage} updated`, data: saveData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error.message });
  }
});

accounts.delete("/:useID", async (req, res) => {
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

export default accounts;
