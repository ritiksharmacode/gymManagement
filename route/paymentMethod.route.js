import express from "express";
import paymentMethodConnection from "../model/paymentMethod.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const paymentMethod = express.Router();
const useModel = paymentMethodConnection;
const useMessage = "paymentMethod";

paymentMethod.get("/", async (req, res) => {
  try {
    const mongoData = await useModel.find({}).sort("paymentMethod");

    res.send({ message: `all ${useMessage}`, data: mongoData });
  } catch (error) {
    console.log("save error", error);
    res.status(401).json({ message: error });
  }
});

paymentMethod.post("/", async (req, res) => {
  let useBody = {
    paymentMethod: req.body.paymentMethod,
    remarks: req.body.remarks,
  };

  mongoSave(res, useModel, useMessage, useBody);
});

paymentMethod.put("/:useID", async (req, res) => {
  let useBody = {
    paymentMethod: req.body.paymentMethod,
    remarks: req.body.remarks,
  };

  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

paymentMethod.delete("/:useID", async (req, res) => {
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

export default paymentMethod;
