import mongoose, { Schema } from "mongoose";

const MediaSchema = new mongoose.Schema({
  newMemberId: {
    type: Schema.Types.ObjectId,
    ref: "newMember",
    required: true,
  },
  attendanceDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const mediaConnection = mongoose.model("media", MediaSchema);

export default mediaConnection;
