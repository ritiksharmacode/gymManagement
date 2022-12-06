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
const NewMemberSchema = new mongoose_1.default.Schema({
    photo: {
        type: String,
        default: "",
    },
    contact: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        default: Date,
    },
    additionalContact: {
        type: String,
        default: "",
    },
    emailId: {
        type: String,
        default: "",
    },
    occupation: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    postcode: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
    FavourOf: {
        type: String,
        enum: ["S/O", "D/O", "W/O"],
        default: "S/O",
    },
    FavourName: {
        type: String,
        default: "",
    },
    purposeOfJoining: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "purpose",
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["NOT KNOWN", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        default: "NOT KNOWN",
    },
    maritalStatus: {
        type: String,
        enum: [
            "NOT KNOWN",
            "SINGLE",
            "MARRIED",
            "WIDOWED",
            "DIVORCED",
            "SEPARATED",
        ],
        default: "NOT KNOWN",
    },
    dateOfAnniversary: {
        type: Date,
        default: Date.now,
    },
    query: {
        type: String,
        default: "",
    },
    biometric: {
        type: String,
        default: "",
    },
    referredBy: {
        type: String,
        default: "",
    },
    response: {
        type: String,
        required: true,
    },
    interestInPackage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "package",
        required: true,
    },
    followUpDate: {
        type: Date,
        default: Date.now,
    },
    followUpStatus: {
        type: Boolean,
        default: false,
    },
    entryStatus: {
        type: String,
        enum: ["enquiry", "newMember"],
        default: "newMember",
    },
});
const newMemberConnection = mongoose_1.default.model("newMember", NewMemberSchema);
exports.default = newMemberConnection;
