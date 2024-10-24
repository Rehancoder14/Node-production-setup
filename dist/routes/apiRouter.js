"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController_1 = __importDefault(require("../controller/apiController"));
const resumeController_1 = __importDefault(require("../controller/resumeController"));
const router = (0, express_1.Router)();
router.route('/self').get(apiController_1.default.self);
router.route('/health').get(apiController_1.default.health);
router.route('/resume').get(resumeController_1.default.getResume);
router.route('/resume/skills').post(resumeController_1.default.addSkills);
router.route('/resume/personal-details').post(resumeController_1.default.addPersonalDetails);
exports.default = router;
