"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("./errorResponse"));
exports.default = (nextFunc, err, req, errorStatusCode) => {
    const errorObject = (0, errorResponse_1.default)(err, req, errorStatusCode);
    return nextFunc(errorObject);
};
