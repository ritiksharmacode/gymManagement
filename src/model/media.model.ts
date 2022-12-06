import mongoose, { Schema } from "mongoose";

const MediaSchema = new mongoose.Schema({
  newMemberId: {
    type: Schema.Types.ObjectId,
    ref: "newMember",
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
    default: "",
  },
});

const mediaConnection = mongoose.model("media", MediaSchema);

export default mediaConnection;
