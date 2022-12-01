import express from "express";
import subscriptionConnection from "../model/subscription.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const subscription = express.Router();
const useModel = subscriptionConnection;
const useMessage = "subscription";

// subscription.get("/:useID", async (req, res) => {
//   try {
//     const mongoData = await useModel
//       .find({ newMemberId: req.params.useID })
//       .sort("membershipFrom");

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

// subscription.post("/", async (req, res) => {
//   let useBody = {
//     newMemberId: req.body.newMemberId,
//     registrationFee: req.body.registrationFee,
//     membershipPackage: req.body.membershipPackage,
//     basicPrice: req.body.basicPrice,
//     gstPrice: req.body.gstPrice,
//     netPrice: req.body.netPrice,
//     discount: req.body.discount,
//     netPayable: req.body.netPayable,
//     membershipFrom: req.body.membershipFrom,
//     membershipTill: req.body.membershipTill,
//     remarks: req.body.remarks,
//   };

//   mongoSave(res, useModel, useMessage, useBody);
// });

subscription.put("/:useID", async (req, res) => {
  let useBody = {
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

  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// subscription.delete("/:useID", async (req, res) => {
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

export default subscription;
