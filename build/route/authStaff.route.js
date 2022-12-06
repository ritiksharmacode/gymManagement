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
const staffInfo_model_1 = __importDefault(require("../model/staffInfo.model"));
const mongo_utils_1 = require("../utils/mongo.utils");
const authorizedStaff = express_1.default.Router();
authorizedStaff.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bcryptPassword = yield bcrypt_1.default.hash(`${req.body.password}`, 12);
    let useBody = {
        gymContact: req.body.userName,
        password: bcryptPassword,
    };
    (0, mongo_utils_1.mongoUpdate)(res, useModel, useMessage, useBody, req.params.useID);
}));
authorizedStaff.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let receivedToken = req.header("authorization");
        receivedToken = receivedToken && receivedToken.split(" ")[1];
        yield staffInfo_model_1.default.updateOne({ "loginToken.token": receivedToken }, {
            $pull: {
                loginToken: { token: receivedToken },
            },
        });
        res.status(201).json({ message: "buyer logout", data: {} });
    }
    catch (error) {
        console.log("save error", error);
        res.status(400).json({ message: error.message });
    }
}));
exports.default = authorizedStaff;
