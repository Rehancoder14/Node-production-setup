import { Response} from 'express';
import { THttpResponse } from '../types/types';
// import config  from '../config/config';
// import { EApplicationEnvironment } from '../constant/application';
import logger from './logger';

export default  (res: Response, responseStatusCode: number,responseMessage: string, data: unknown= null): void=>{
    const response : THttpResponse= {
        success: true,
        status: responseStatusCode,
        // request: {
        //     ip: req.ip,
        //     method: req.method,
        //     url: req.url,
        // },
        message: responseMessage,
        data: data
        
    }
   logger.info('CONTROLLER_RESPONSE',{
        meta : response
    });
    // if(config.ENV===EApplicationEnvironment.PRODUCTION){
    //     delete response.request.ip;
    // }
    res.status(responseStatusCode).json(response);
}