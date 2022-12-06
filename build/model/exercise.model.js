"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ExerciseSchema = new mongoose_1.default.Schema({
    photo: {
        type: String,
        default: "",
    },
    exerciseName: {
        type: String,
        required: true,
    },
    exerciseDescription: {
        type: String,
        default: "",
    },
});
const exerciseConnection = mongoose_1.default.model("exercise", ExerciseSchema);
exports.default = exerciseConnection;
