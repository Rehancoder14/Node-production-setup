"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRateLimiter = exports.rateLimiterMongo = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const POINTS = 10;
const DURATION = 60;
exports.rateLimiterMongo = null;
const initRateLimiter = (mongooseConnection) => {
    exports.rateLimiterMongo = new rate_limiter_flexible_1.RateLimiterMongo({
        storeClient: mongooseConnection,
        keyPrefix: "rateLimiter",
        points: POINTS,
        duration: DURATION,
    });
};
exports.initRateLimiter = initRateLimiter;
