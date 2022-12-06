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
const WorkOutPlanSchema = new mongoose_1.default.Schema({
    newMemberId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "exercisePlan",
        },
    ],
    tuesdayWorkOut: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "exercisePlan",
        },
    ],
    wednesdayWorkOut: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "exercisePlan",
        },
    ],
    thursdayWorkOut: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "exercisePlan",
        },
    ],
    fridayWorkOut: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "exercisePlan",
        },
    ],
    saturdayWorkOut: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "exercisePlan",
        },
    ],
    sundayWorkOut: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "exercisePlan",
        },
    ],
});
const workOutPlanConnection = mongoose_1.default.model("workOutPlan", WorkOutPlanSchema);
exports.default = workOutPlanConnection;
