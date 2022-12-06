"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const gymInfo_model_1 = __importDefault(require("../model/gymInfo.model"));
const staffInfo_model_1 = __importDefault(require("../model/staffInfo.model"));
const accessLevel_model_1 = __importDefault(require("../model/accessLevel.model"));
const common_utils_1 = require("../utils/common.utils");
const entryPoint = express_1.default.Router();
entryPoint.post("/signUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let signUpData = {
            gymContact: req.body.gymContact,
            gymName: req.body.gymName,
            gymEmailId: req.body.gymEmailId,
            gymAddress: req.body.gymAddress,
            state: req.body.state,
            country: req.body.country,
        };
        const newGymInfo = new gymInfo_model_1.default(signUpData);
        let saveData1 = yield newGymInfo.save();
        let accessLevelData = {
            accessLevelName: "Master",
        };
        const newAccessLevel = new accessLevel_model_1.default(accessLevelData);
        let saveData2 = yield newAccessLevel.save();
        const bcryptPassword = yield bcrypt_1.default.hash(`${req.body.gymContact}`, 12);
        let staffInfoData = {
            accessLevelName: saveData2._id,
            name: "Master User",
            gymContact: req.body.gymContact,
            password: bcryptPassword,
        };
        const newStaffInfo = new staffInfo_model_1.default(staffInfoData);
        let saveData3 = yield newStaffInfo.save();
        res.status(201).json({
            message: "new gymInfo saved",
            data: saveData3,
        });
    }
    catch (error) {
        console.log("save error", error);
        res.status(400).json({ message: error.message });
    }
}));
entryPoint.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let saveData = yield staffInfo_model_1.default
            .findOne({
            gymContact: req.body.userName,
        })
            .lean();
        if (!saveData) {
            throw "gymInfo not registered";
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(req.body.password, saveData.password);
        if (!isPasswordMatch) {
            throw "invalid credential";
        }
        const payLoad = { staffID: saveData._id };
        const token = jsonwebtoken_1.default.sign(payLoad, common_utils_1.jwtSecretKey);
        yield staffInfo_model_1.default.updateOne({ _id: saveData._id }, {
            $addToSet: {
                loginToken: { token: token },
            },
        });
        res.status(201).json({
            message: " login successful",
            data: {
                token,
                gymContact: saveData.gymContact,
            },
        });
    }
    catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
}));
entryPoint.put("/forgetPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bcryptPassword = yield bcrypt_1.default.hash(`${req.body.password}`, 12);
        let saveData = yield staffInfo_model_1.default.updateOne({ gymContact: req.body.userName }, {
            password: bcryptPassword,
        });
        res.status(201).json({ message: "new password success ", data: saveData });
    }
    catch (error) {
        console.log("save error", error);
        res.status(400).json({ message: error.message });
    }
}));
exports.default = entryPoint;
