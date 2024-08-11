import { NextFunction, Request } from "express";
import httpError from "./errorResponse";
export default (
  nextFunc: NextFunction,
  err: Error | unknown,
  req: Request,
  errorStatusCode: number
): void => {
  const errorObject = httpError(err, req, errorStatusCode);
  return nextFunc(errorObject);
};
