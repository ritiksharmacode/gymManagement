import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  photo: {
    type: String,
    default: "",
  },
  exerciseName: {
    type: String,
    required: true,
  },
  exerciseDescription: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const exerciseConnection = mongoose.model("exercise", ExerciseSchema);

export default exerciseConnection;
