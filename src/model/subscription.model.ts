import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  newMemberId: {
    type: Schema.Types.ObjectId,
    ref: "newMember",
    required: true,
  },
  registrationFee: {
    type: Number,
    default: 0,
  },
  membershipPackage: {
    type: Schema.Types.ObjectId,
    ref: "package",
    required: true,
  },
  basicPrice: {
    type: Number,
    default: 0,
  },
  gstPrice: {
    type: Number,
    required: true,
  },
  netPrice: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  netPayable: {
    type: Number,
    default: 0,
  },

  membershipFrom: {
    type: Date,
    default: Date.now,
  },
  membershipTill: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const subscriptionConnection = mongoose.model(
  "subscription",
  SubscriptionSchema
);

export default subscriptionConnection;
