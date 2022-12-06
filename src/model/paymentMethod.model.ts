import mongoose from "mongoose";

const PaymentMethodsSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    default: "",
  },
});

const paymentMethodsConnection = mongoose.model(
  "PaymentMethod",
  PaymentMethodsSchema
);

export default paymentMethodsConnection;
