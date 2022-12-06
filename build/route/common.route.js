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
const mongo_utils_js_1 = require("../utils/mongo.utils.js");
const accessLevel_model_js_1 = __importDefault(require("../model/accessLevel.model.js"));
const accounts_model_js_1 = __importDefault(require("../model/accounts.model.js"));
const exercise_model_js_1 = __importDefault(require("../model/exercise.model.js"));
const exercisePlan_model_js_1 = __importDefault(require("../model/exercisePlan.model.js"));
const measurement_model_js_1 = __importDefault(require("../model/measurement.model.js"));
const media_model_js_1 = __importDefault(require("../model/media.model.js"));
const newMember_model_js_1 = __importDefault(require("../model/newMember.model.js"));
const nutritionChart_model_js_1 = __importDefault(require("../model/nutritionChart.model.js"));
const packages_model_js_1 = __importDefault(require("../model/packages.model.js"));
const paymentMethod_model_js_1 = __importDefault(require("../model/paymentMethod.model.js"));
const purpose_model_js_1 = __importDefault(require("../model/purpose.model.js"));
const staffInfo_model_js_1 = __importDefault(require("../model/staffInfo.model.js"));
const subscription_model_js_1 = __importDefault(require("../model/subscription.model.js"));
const workOutPlan_model_js_1 = __importDefault(require("../model/workOutPlan.model.js"));
const common = express_1.default.Router();
const useMessage = "common";
const allConnections = {
    accessLevel: accessLevel_model_js_1.default,
    accounts: accounts_model_js_1.default,
    exercise: exercise_model_js_1.default,
    exercisePlan: exercisePlan_model_js_1.default,
    measurement: measurement_model_js_1.default,
    media: media_model_js_1.default,
    newMember: newMember_model_js_1.default,
    nutritionChart: nutritionChart_model_js_1.default,
    packages: packages_model_js_1.default,
    paymentMethod: paymentMethod_model_js_1.default,
    purpose: purpose_model_js_1.default,
    staffInfo: staffInfo_model_js_1.default,
    subscription: subscription_model_js_1.default,
    workOutPlan: workOutPlan_model_js_1.default,
};
common.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nowBody = req.body;
        const mongoData = yield allConnections[nowBody.useModel]
            .find(nowBody.useWhere)
            .sort(nowBody.useSort);
        res.send({ message: `all ${useMessage}`, data: mongoData });
    }
    catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error });
    }
}));
common.post("/save", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nowBody = req.body;
    if (nowBody.useModel == "staffInfo") {
        const bcryptPassword = yield bcrypt_1.default.hash(`${nowBody.gymContact}`, 12);
        nowBody.useData.password = bcryptPassword;
    }
    (0, mongo_utils_js_1.mongoSave)(res, allConnections[nowBody.useModel], useMessage, nowBody.useData);
}));
common.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nowBody = req.body;
    (0, mongo_utils_js_1.mongoUpdate)(res, allConnections[nowBody.useModel], useMessage, nowBody.useData, nowBody.useID);
}));
common.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nowBody = req.body;
        let saveData = yield allConnections[nowBody.useModel].deleteOne(nowBody.useWhere);
        res.status(201).json({ message: `${useMessage} deleted`, data: saveData });
    }
    catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error.message });
    }
}));
exports.default = common;
