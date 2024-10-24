"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rateLimiter_1 = require("../config/rateLimiter");
const httpError_1 = __importDefault(require("../utils/httpError"));
const responseMessage_1 = __importDefault(require("../constant/responseMessage"));
exports.default = (req, _, next) => {
    if (rateLimiter_1.rateLimiterMongo) {
        rateLimiter_1.rateLimiterMongo
            .consume(req.ip, 1)
            .then(() => {
            next();
        })
            .catch((_) => {
            (0, httpError_1.default)(next, new Error(responseMessage_1.default.TOO_MANY_REQUEST), req, 429);
        });
    }
    else {
        next();
    }
};
