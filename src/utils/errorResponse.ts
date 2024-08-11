import { Request } from "express";
import { THttpError } from "../types/types";
import responseMessage from "../constant/responseMessage";
import config from "../config/config";
import { EApplicationEnvironment } from "../constant/application";
export default (
  err: Error | unknown,
  req: Request,
  errorStatusCode: number = 500
): THttpError => {
  const httpError: THttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl,
    },
    message:
      err instanceof Error ? err.message : responseMessage.SOMETHINGWENTWRONG,
    data: null,
    trace: err instanceof Error ? { error: err.stack } : null,
  };

  console.error("CONTROLLER_RESPONSE", { meta: httpError });

  if (config.ENV == EApplicationEnvironment.PRODUCTION) {
    delete httpError.request.ip;
    delete httpError.trace;
  }
  return httpError;
};
