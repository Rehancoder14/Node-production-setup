import { createLogger, format, transports } from "winston";
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from "winston/lib/winston/transports";
import path from "path";
import config from "../config/config";
import { EApplicationEnvironment } from "../constant/application";
import * as sourceMapSuport from "source-map-support";
import { blue, red, yellow, green } from "colorette";
import 'winston-mongodb';
import { MongoDBTransportInstance } from "winston-mongodb";
sourceMapSuport.install();

const colorise = (level: string) => {
  switch (level) {
    case "ERROR":
      return red(level);
    case "INFO":
      return blue(level);
    case "WARN":
      return yellow(level);
    default:
      return level;
  }
};

// Format for console logs with colorized log level
const consoleLogFormat = format.printf(
  ({ level, message, timestamp, meta = {} }) => {
    const customLevel = colorise(level.toUpperCase()); // Apply color to log level
    const customTime = green(timestamp); // Colorize timestamp
    const customMessage = message;
    const customMeta = meta && Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 4)}` : ""; // Optional metadata
    return `${customLevel} ${customTime} ${customMessage}${customMeta}`;
  }
);

// Format for file logs without color
const fileLogFormat = format.printf(
  ({ level, message, timestamp, ...meta }) => {
    const logMeta: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(meta)) {
      if (value instanceof Error) {
        logMeta[key] = {
          name: value.name,
          message: value.message,
          trace: value.stack || "",
        };
      } else {
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
  }
);

// Console transport for development with colored logs
const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: "info",
        format: format.combine(format.timestamp(), consoleLogFormat),
      }),
    ];
  }
  return [];
};

// File transport for logging into a file
const fileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: path.join(__dirname, "../", "../", "logs", `${config.ENV}.log`),
      level: "info",
      format: format.combine(format.timestamp(), fileLogFormat),
    }),
  ];
};
const mongodbTransport = (): Array<MongoDBTransportInstance> => {
  return [
    new transports.MongoDB({level: 'info',db:config.DATABASE_URL as string,metaKey:
      'meta',
      expireAfterSeconds:3600*24*30,
      collection: "Application logs"
    }),
  ];
};

// Create and export the logger
export default createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: [...fileTransport(),... mongodbTransport() ,...consoleTransport()],
});
