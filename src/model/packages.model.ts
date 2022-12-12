import mongoose from "mongoose";

const PackagesSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  packageDetails: {
    type: String,
    default: "",
  },
  packageDurationUnit: {
    type: String,
    enum: ["Months", "Days"],
    required: true,
  },
  packageDuration: {
    type: Number,
    required: true,
  },
  packagePrice: {
    type: Number,
    required: true,
  },
  selectGst: {
    type: String,
    enum: ["Not Applicable", "Price Including 18%", "Price Excluding 18%"],
    default: "",
  },
  HSN: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const packagesConnection = mongoose.model("package", PackagesSchema);

export default packagesConnection;
