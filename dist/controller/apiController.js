"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = __importDefault(require("../utils/httpResponse"));
const responseMessage_1 = __importDefault(require("../constant/responseMessage"));
const httpError_1 = __importDefault(require("../utils/httpError"));
const quicker_1 = __importDefault(require("../utils/quicker"));
exports.default = {
    self: (req, res, next) => {
        try {
            (0, httpResponse_1.default)(res, 200, responseMessage_1.default.SUCCESS, { 'name': 'Rehan' });
        }
        catch (err) {
            (0, httpError_1.default)(next, err, req, 500);
        }
    },
    health: (req, res, next) => {
        try {
            const healthData = {
                application: quicker_1.default.getApplicationHealth(),
                system: quicker_1.default.getSystemHealth(),
                timeStamp: Date.now(),
            };
            (0, httpResponse_1.default)(res, 200, responseMessage_1.default.SUCCESS, healthData);
        }
        catch (err) {
            (0, httpError_1.default)(next, err, req, 500);
        }
    }
};
