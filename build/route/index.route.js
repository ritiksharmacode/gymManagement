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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const entryPoint_route_1 = __importDefault(require("./entryPoint.route"));
const authStaff_route_1 = __importDefault(require("./authStaff.route"));
const staffInfo_model_1 = __importDefault(require("../model/staffInfo.model"));
const common_route_1 = __importDefault(require("./common.route"));
const common_utils_1 = require("../utils/common.utils");
const router = express_1.default.Router();
let checkStaffToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let receivedToken = req.header("authorization") || "";
        receivedToken = (receivedToken && receivedToken.split(" ")[1]) || "";
        const { staffID } = jsonwebtoken_1.default.verify(receivedToken, common_utils_1.jwtSecretKey);
        let staffData = yield staffInfo_model_1.default
            .findOne({
            $and: [
                { _id: staffID },
                { "loginToken.token": receivedToken },
            ],
        })
            .lean();
        if (!staffData) {
            throw "invalid token";
        }
        console.log("middleware");
        req.staffID = staffID;
        next();
    }
    catch (error) {
        console.log("hello");
        return res.status(403).json({ message: error });
    }
});
router.use("/entryPoint", entryPoint_route_1.default);
router.use("/authStaff", checkStaffToken, authStaff_route_1.default);
router.use("/common", checkStaffToken, common_route_1.default);
exports.default = router;
