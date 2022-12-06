"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GymInfoSchema = new mongoose_1.default.Schema({
    gymContact: {
        type: Number,
        required: true,
    },
    gymName: {
        type: String,
        required: true,
    },
    gymEmailId: {
        type: String,
        required: true,
    },
    gymAddress: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    businessLogo: {
        type: String,
        default: "",
    },
    additionalContact: {
        type: String,
        default: "",
    },
    businessWebsite: {
        type: String,
        default: "",
    },
    ownerName: {
        type: String,
        default: "Owner",
    },
    postCode: {
        type: Number,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    mapLocation: {
        type: String,
        default: "",
    },
    twitter: {
        type: String,
        default: "",
    },
    facebook: {
        type: String,
        default: "",
    },
    instagram: {
        type: String,
        default: "",
    },
    whatsapp: {
        type: String,
        default: "",
    },
    bankName: {
        type: String,
        default: "",
    },
    bankBranch: {
        type: String,
        default: "",
    },
    accountType: {
        type: String,
        enum: ["saving", "current"],
        default: "saving",
    },
    accountHolderName: {
        type: String,
        default: "",
    },
    accountNumber: {
        type: String,
        default: "",
    },
    accountIfsc: {
        type: String,
        default: "",
    },
    businessGst: {
        type: String,
        default: "",
    },
    wishes: {
        type: String,
        default: "",
    },
    businessTagline: {
        type: String,
        default: "",
    },
    termsAndConditions: {
        type: String,
        default: "",
    },
    registrationFee: {
        type: Number,
    },
    registrationPrefix: {
        type: String,
        default: "",
    },
    newPackageSubscription: {
        type: Boolean,
        default: false,
    },
    expiringIn7Days: {
        type: Boolean,
        default: false,
    },
    expirationDay: {
        type: Boolean,
        default: false,
    },
    automaticBirthdayWishes: {
        type: Boolean,
        default: false,
    },
    automaticAnniversaryWishes: {
        type: Boolean,
        default: false,
    },
    staffLogin: {
        type: Boolean,
        default: true,
    },
    logo: {
        type: Boolean,
        default: true,
    },
    bankInfo: {
        type: Boolean,
        default: true,
    },
});
const gymInfoConnection = mongoose_1.default.model("gymInfo", GymInfoSchema);
exports.default = gymInfoConnection;
