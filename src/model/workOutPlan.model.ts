import mongoose, { Schema } from "mongoose";

const WorkOutPlanSchema = new mongoose.Schema({
  newMemberId: {
    type: Schema.Types.ObjectId,
    ref: "newMember",
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  workOutPlanName: {
    type: String,
    required: true,
  },
  mondayWorkOut: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercisePlan",
    },
  ],
  tuesdayWorkOut: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercisePlan",
    },
  ],
  wednesdayWorkOut: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercisePlan",
    },
  ],
  thursdayWorkOut: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercisePlan",
    },
  ],
  fridayWorkOut: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercisePlan",
    },
  ],
  saturdayWorkOut: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercisePlan",
    },
  ],
  sundayWorkOut: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercisePlan",
    },
  ],
}, { timestamps: true });

const workOutPlanConnection = mongoose.model("workOutPlan", WorkOutPlanSchema);

export default workOutPlanConnection;
