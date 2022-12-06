"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentMethodsSchema = new mongoose_1.default.Schema({
    paymentMethod: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        default: "",
    },
});
const paymentMethodsConnection = mongoose_1.default.model("PaymentMethod", PaymentMethodsSchema);
exports.default = paymentMethodsConnection;
