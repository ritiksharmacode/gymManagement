import express from "express";
import staffInfoConnection from "../model/staffInfo.model.js";
import bcrypt from "bcrypt";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const staffInfo = express.Router();
const useModel = staffInfoConnection;
const useMessage = "staffInfo";

// staffInfo.get("/", async (req, res) => {
//   try {
//     const mongoData = await useModel.find({}).sort("name");

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

staffInfo.post("/", async (req, res) => {
  const bcryptPassword = await bcrypt.hash(`${req.body.gymContact}`, 12);
  let useBody = {
    photo: req.body.photo,
    accessLevelName: req.body.accessLevelName,
    name: req.body.name,
    gymContact: req.body.gymContact,
    password: bcryptPassword,
  };

  mongoSave(res, useModel, useMessage, useBody);
});

staffInfo.put("/:useID", async (req, res) => {
  let useBody = {
    photo: req.body.photo,
    accessLevelName: req.body.accessLevelName,
    name: req.body.name,
    gymContact: req.body.gymContact,
    // password: req.body.password,
  };

  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// staffInfo.delete("/:useID", async (req, res) => {
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

export default staffInfo;
