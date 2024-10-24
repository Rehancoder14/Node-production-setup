"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config/config"));
const application_1 = require("../constant/application");
const sourceMapSuport = __importStar(require("source-map-support"));
const colorette_1 = require("colorette");
require("winston-mongodb");
sourceMapSuport.install();
const colorise = (level) => {
    switch (level) {
        case "ERROR":
            return (0, colorette_1.red)(level);
        case "INFO":
            return (0, colorette_1.blue)(level);
        case "WARN":
            return (0, colorette_1.yellow)(level);
        default:
            return level;
    }
};
const consoleLogFormat = winston_1.format.printf(({ level, message, timestamp, meta = {} }) => {
    const customLevel = colorise(level.toUpperCase());
    const customTime = (0, colorette_1.green)(timestamp);
    const customMessage = message;
    const customMeta = meta && Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 4)}` : "";
    return `${customLevel} ${customTime} ${customMessage}${customMeta}`;
});
const fileLogFormat = winston_1.format.printf((_a) => {
    var { level, message, timestamp } = _a, meta = __rest(_a, ["level", "message", "timestamp"]);
    const logMeta = {};
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || "",
            };
        }
        else {
            logMeta[key] = value;
        }
    }
    const logData = {
        level: level.toUpperCase(),
        timestamp: timestamp,
        message: message,
        meta: logMeta,
    };
    return JSON.stringify(logData, null, 4);
});
const consoleTransport = () => {
    if (config_1.default.ENV === application_1.EApplicationEnvironment.DEVELOPMENT) {
        return [
            new winston_1.transports.Console({
                level: "info",
                format: winston_1.format.combine(winston_1.format.timestamp(), consoleLogFormat),
            }),
        ];
    }
    return [];
};
const fileTransport = () => {
    return [
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, "../", "../", "logs", `${config_1.default.ENV}.log`),
            level: "info",
            format: winston_1.format.combine(winston_1.format.timestamp(), fileLogFormat),
        }),
    ];
};
const mongodbTransport = () => {
    return [
        new winston_1.transports.MongoDB({ level: 'info', db: config_1.default.DATABASE_URL, metaKey: 'meta',
            expireAfterSeconds: 3600 * 24 * 30,
            collection: "Application logs" }),
    ];
};
exports.default = (0, winston_1.createLogger)({
    defaultMeta: {
        meta: {},
    },
    transports: [...fileTransport(), ...mongodbTransport(), ...consoleTransport()],
});
