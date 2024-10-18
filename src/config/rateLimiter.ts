import { Connection } from "mongoose";
import { RateLimiterMongo } from "rate-limiter-flexible"

const POINTS = 10;
const DURATION = 60;
export let rateLimiterMongo: null| RateLimiterMongo = null;
export const initRateLimiter = (mongooseConnection: Connection)=>{
    rateLimiterMongo = new RateLimiterMongo({
        storeClient: mongooseConnection,
        keyPrefix: "rateLimiter",
        points: POINTS,
        duration:DURATION,
        
    });
}