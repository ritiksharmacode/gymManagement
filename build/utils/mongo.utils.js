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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUpdate = exports.mongoSave = void 0;
const mongoSave = (res, useModel, useMessage, useData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prepareSave = new useModel(useData);
        let savedData = yield prepareSave.save();
        res
            .status(201)
            .json({ message: `new ${useMessage} save`, data: savedData });
    }
    catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error.message });
    }
});
exports.mongoSave = mongoSave;
const mongoUpdate = (res, useModel, useMessage, useData, useID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let savedData = yield useModel.updateOne({ _id: useID }, useData);
        res.status(201).json({ message: `${useMessage} updated`, data: savedData });
    }
    catch (error) {
        console.log("save error", error);
        res.status(401).json({ message: error.message });
    }
});
exports.mongoUpdate = mongoUpdate;
