import mongoose from "mongoose";

const accessLevelSchema = new mongoose.Schema({
  accessLevelName: {
    type: String,
    required: true,
  },
});

const accessLevelConnection = mongoose.model("accessLevel", accessLevelSchema);

export default accessLevelConnection;
