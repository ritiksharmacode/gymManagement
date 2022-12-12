import mongoose, { Schema } from "mongoose";

const AccountsSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
  },
  paymentMethod: {
    type: Schema.Types.ObjectId,
    ref: "paymentMethod",
  },

  remarks: {
    type: String,
    default: "",
  },
  entryType: {
    type: String,
    enum: ["debit", "credit"],
    default: "debit",
  },
}, { timestamps: true });

const accountsConnection = mongoose.model("account", AccountsSchema);

export default accountsConnection;
