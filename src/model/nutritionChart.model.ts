import mongoose, { Schema } from "mongoose";

const NutritionChartSchema = new mongoose.Schema({
  newMemberId: {
    type: Schema.Types.ObjectId,
    ref: "newMember",
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  purposeName: {
    type: String,
    required: true,
  },
  mondayDiet: {
    type: String,
    default: "",
  },
  tuesdayDiet: {
    type: String,
    default: "",
  },
  wednesdayDiet: {
    type: String,
    default: "",
  },
  thursdayDiet: {
    type: String,
    default: "",
  },
  fridayDiet: {
    type: String,
    default: "",
  },
  saturdayDiet: {
    type: String,
    default: "",
  },
  sundayDiet: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const nutritionChartConnection = mongoose.model(
  "nutritionChart",
  NutritionChartSchema
);

export default nutritionChartConnection;
