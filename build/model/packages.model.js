"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PackagesSchema = new mongoose_1.default.Schema({
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
});
const packagesConnection = mongoose_1.default.model("package", PackagesSchema);
exports.default = packagesConnection;
