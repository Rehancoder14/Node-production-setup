import { createLogger, format, transports } from "winston";
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from "winston/lib/winston/transports";

import path from "path"; // Import path from 'path'
import config from "../config/config";
import { EApplicationEnvironment } from "../constant/application";
// const consoleLogFormat = format.printf(
//   ({ level, message, timestamp, meta = {} }) => {
//     const customLevel = level.toUpperCase();
//     const customMessage = message;
//     const customTime = timestamp;
//     const customMeta = meta;
//     return `${customLevel} ${customTime}\n${customMeta}\n${customMessage}`;
//   }
// );
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

const consoleTransport = (): Array<ConsoleTransportInstance> => {
  if (config.ENV == EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: "info",
        format: format.combine(format.timestamp(), fileLogFormat ),
      }),
    ];
  }
  return [];
};

// ... rest of the code
const fileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: path.join(
        __dirname,
        "../",
        "../",
        "logs",
        `${config.ENV}.logs`
      ), // Fixed 'fileName' to 'filename'
      level: "info",
      format: format.combine(format.timestamp(), fileLogFormat),
    }),
  ];
};

export default createLogger({
  defaultMeta: {
    meta: {},
  },
  transports: [...fileTransport(), ...consoleTransport()],
});
