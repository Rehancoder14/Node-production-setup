import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import router from "./routes/apiRouter";
import globalErrorHandler from "./middleware/globalErrorHandler";
import httpError from "./utils/httpError";
import responseMessage from "./constant/responseMessage";

const app: Application = express();

app.use(express.json()); // mandatory to json request
app.use(express.static(path.join(__dirname, "../", "public")));
app.use('/api/v1',router);
app.use((req: Request, _: Response, next: NextFunction) => {
 try{
    throw new Error(responseMessage.NOTFOUND('route'));
 }catch(err){
    httpError(next, err, req, 404)
    next();
 }
});

app.use(globalErrorHandler);

export default app;
