import { NextFunction, Request, Response } from "express";
import { THttpError } from "../types/types";

export default (err:THttpError,_:Request, res: Response, _next:NextFunction )=>{
    res.status(err.statusCode).json(err);
}