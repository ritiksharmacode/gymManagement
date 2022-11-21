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
    required: true,
  },
  paymentMethod: {
    type: Schema.Types.ObjectId,
    ref: "paymentMethod",
    required: true,
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
});

const accountsConnection = mongoose.model("account", AccountsSchema);

export default accountsConnection;
