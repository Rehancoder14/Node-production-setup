"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, _, res, _next) => {
    res.status(err.statusCode).json(err);
};
