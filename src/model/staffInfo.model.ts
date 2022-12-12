import mongoose, { Schema } from "mongoose";

const staffInfoSchema = new mongoose.Schema({
  photo: {
    type: String,
    default: "",
  },
  accessLevelName: {
    type: Schema.Types.ObjectId,
    ref: "accessLevel",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gymContact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  loginToken: [{ token: { type: String, required: true } }],
}, { timestamps: true });

const staffInfoConnection = mongoose.model("staffInfo", staffInfoSchema);

export default staffInfoConnection;
