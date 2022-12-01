import express from "express";
import accountsConnection from "../model/accounts.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const accounts = express.Router();
const useModel = accountsConnection;
const useMessage = "accounts";

// accounts.get("/:useID", async (req, res) => {
//   try {
//     const mongoData = await useModel
//       .find({ newMemberId: req.params.useID })
//       .sort("date");

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

// accounts.post("/", async (req, res) => {
//   let useBody = {
//     newMemberId: req.body.newMemberId,
//     photo: req.body.photo,
//     date: req.body.date,
//     amount: req.body.amount,
//     paymentMethod: req.body.paymentMethod,
//     remarks: req.body.remarks,
//     entryType: req.body.entryType,
//   };
//   mongoSave(res, useModel, useMessage, useBody);
// });

accounts.put("/:useID", async (req, res) => {
  let useBody = {
    photo: req.body.photo,
    date: req.body.date,
    amount: req.body.amount,
    remarks: req.body.remarks,
    entryType: req.body.entryType,
  };
  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// accounts.delete("/:useID", async (req, res) => {
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

export default accounts;
