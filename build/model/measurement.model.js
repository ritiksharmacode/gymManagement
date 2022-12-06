"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const MeasurementSchema = new mongoose_1.default.Schema({
    newMemberId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
const measurementConnection = mongoose_1.default.model("measurement", MeasurementSchema);
exports.default = measurementConnection;
