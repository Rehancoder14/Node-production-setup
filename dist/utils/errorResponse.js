"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessage_1 = __importDefault(require("../constant/responseMessage"));
const config_1 = __importDefault(require("../config/config"));
const application_1 = require("../constant/application");
const logger_1 = __importDefault(require("./logger"));
exports.default = (err, req, errorStatusCode = 500) => {
    const httpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: err instanceof Error ? err.message : responseMessage_1.default.SOMETHINGWENTWRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null,
    };
    logger_1.default.error("CONTROLLER_RESPONSE", { meta: httpError });
    if (config_1.default.ENV == application_1.EApplicationEnvironment.PRODUCTION) {
        delete httpError.request.ip;
        delete httpError.trace;
    }
    return httpError;
};
