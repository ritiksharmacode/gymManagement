import express from "express";
import accessLevelConnection from "../model/accessLevel.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const accessLevel = express.Router();
const useModel = accessLevelConnection;
const useMessage = "accessLevel";

// accessLevel.get("/", async (req, res) => {
//   try {
//     const mongoData = await useModel.find({}).sort("accessLevelName");

//     res.send({ message: `all ${useMessage}`, data: mongoData });
//   } catch (error) {
//     console.log("save error", error);
//     res.status(401).json({ message: error });
//   }
// });

// accessLevel.post("/", async (req, res) => {
//   let useBody = {
//     accessLevelName: req.body.accessLevelName,
//   };
//   mongoSave(res, useModel, useMessage, useBody);
// });

accessLevel.put("/:useID", async (req, res) => {
  let useBody = {
    accessLevelName: req.body.accessLevelName,
  };
  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// accessLevel.delete("/:useID", async (req, res) => {
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

export default accessLevel;
