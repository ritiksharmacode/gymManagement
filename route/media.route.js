import express from "express";
import mediaConnection from "../model/media.model.js";
import { mongoSave, mongoUpdate } from "../utils/mongo.utils.js";

const media = express.Router();
const useModel = mediaConnection;
const useMessage = "media";

// media.get("/:useID", async (req, res) => {
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

// media.post("/", async (req, res) => {
//   let useBody = {
//     newMemberId: req.body.newMemberId,
//     photo: req.body.photo,
//     date: req.body.date,
//     remarks: req.body.remarks,
//   };
// });

media.put("/:useID", async (req, res) => {
  let useBody = {
    photo: req.body.photo,
    date: req.body.date,
    remarks: req.body.remarks,
  };
  mongoUpdate(res, useModel, useMessage, useBody, req.params.useID);
});

// media.delete("/:useID", async (req, res) => {
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

export default media;
