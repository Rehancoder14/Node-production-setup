"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const httpError_1 = __importDefault(require("./utils/httpError"));
const responseMessage_1 = __importDefault(require("./constant/responseMessage"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH', 'OPTIONS'],
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "public")));
app.use('/api/v1', apiRouter_1.default);
app.use((req, _, next) => {
    try {
        throw new Error(responseMessage_1.default.NOTFOUND('route'));
    }
    catch (err) {
        (0, httpError_1.default)(next, err, req, 404);
        next();
    }
});
app.use(globalErrorHandler_1.default);
exports.default = app;
