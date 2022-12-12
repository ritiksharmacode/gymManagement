import mongoose, { Schema } from "mongoose";

const MeasurementSchema = new mongoose.Schema({
  newMemberId: {
    type: Schema.Types.ObjectId,
    ref: "newMember",
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  dateOfMeasurement: {
    type: Date,
    default: Date.now,
  },
  weight: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: "",
  },
  neck: {
    type: String,
    default: "",
  },
  shoulder: {
    type: String,
    default: "",
  },
  chestExtended: {
    type: String,
    default: "",
  },
  chestNormal: {
    type: String,
    default: "",
  },
  foreArms: {
    type: String,
    default: "",
  },
  biceps: {
    type: String,
    default: "",
  },
  wrist: {
    type: String,
    default: "",
  },
  upperAbs: {
    type: String,
    default: "",
  },
  lowerAbs: {
    type: String,
    default: "",
  },
  waist: {
    type: String,
    default: "",
  },
  hips: {
    type: String,
    default: "",
  },
  thighs: {
    type: String,
    default: "",
  },
  calves: {
    type: String,
    default: "",
  },
  ankles: {
    type: String,
    default: "",
  },
  bloodPressure: {
    type: String,
    default: "",
  },
  sugarLevel: {
    type: String,
    default: "",
  },
  fats: {
    type: String,
    default: "",
  },
  bmi: {
    type: String,
    default: "",
  },
  bmr: {
    type: String,
    default: "",
  },
  medicalHistory: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const measurementConnection = mongoose.model("measurement", MeasurementSchema);

export default measurementConnection;
