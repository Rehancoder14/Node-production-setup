"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    SUCCESS: "Success",
    SOMETHINGWENTWRONG: "Somthing went wrong",
    NOTFOUND: (entity) => {
        return `${entity} not found`;
    },
    TOO_MANY_REQUEST: 'Too many request! Please try again after sometime',
    INVALID_REQUEST: 'Invalid request',
    ALREADYEXISTS: (entity) => {
        return entity;
    }
};
