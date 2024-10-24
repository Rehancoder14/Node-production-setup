"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
exports.default = (res, responseStatusCode, responseMessage, data = null) => {
    const response = {
        success: true,
        status: responseStatusCode,
        message: responseMessage,
        data: data
    };
    logger_1.default.info('CONTROLLER_RESPONSE', {
        meta: response
    });
    res.status(responseStatusCode).json(response);
};
