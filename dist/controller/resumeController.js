"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = __importDefault(require("../utils/httpResponse"));
const responseMessage_1 = __importDefault(require("../constant/responseMessage"));
const httpError_1 = __importDefault(require("../utils/httpError"));
const SkillsModel_1 = __importDefault(require("../model/SkillsModel"));
const PersonalDetailsModel_1 = __importDefault(require("../model/PersonalDetailsModel"));
const getResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield SkillsModel_1.default.find({}, 'skill').lean();
        const details = yield PersonalDetailsModel_1.default.findOne({}, { __v: 0 }).lean();
        if (!details) {
            return (0, httpResponse_1.default)(res, 404, responseMessage_1.default.NOTFOUND("Personal details "));
        }
        return (0, httpResponse_1.default)(res, 200, responseMessage_1.default.SUCCESS, {
            details: details,
            skills: skills
        });
    }
    catch (err) {
        (0, httpError_1.default)(next, err, req, 500);
    }
});
const addSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skill, proficiency } = req.body;
        if (!skill) {
            throw new Error(responseMessage_1.default.NOTFOUND('Skill required'));
        }
        const existingSkill = yield SkillsModel_1.default.findOne({ skill });
        if (existingSkill) {
            throw new Error(responseMessage_1.default.ALREADYEXISTS('Skill already exists'));
        }
        let newSkill = yield SkillsModel_1.default.create({
            skill,
            proficiency: proficiency || 'expert'
        });
        (0, httpResponse_1.default)(res, 200, responseMessage_1.default.SUCCESS, newSkill);
        return;
    }
    catch (err) {
        if (err) {
            (0, httpError_1.default)(next, err, req, 400);
        }
        (0, httpError_1.default)(next, err, req, 500);
        return;
    }
});
const deleteSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, httpResponse_1.default)(res, 200, responseMessage_1.default.SUCCESS, { 'name': 'Rehan' });
    }
    catch (err) {
        if (err) {
            (0, httpError_1.default)(next, err, req, 400);
        }
        (0, httpError_1.default)(next, err, req, 500);
    }
});
const addPersonalDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, about, phoneNumber, email, linkedIn, github, city, profession } = req.body;
        if (!name || !about || !phoneNumber || !email || !linkedIn || !github || !city || !profession) {
            throw new Error(responseMessage_1.default.NOTFOUND('Required Fields: name, profession, about, phoneNumber, email, linkedIn, github, city'));
        }
        let user = yield PersonalDetailsModel_1.default.create({
            name,
            about,
            profession,
            phoneNumber,
            email,
            linkedIn,
            github,
            city
        });
        (0, httpResponse_1.default)(res, 200, responseMessage_1.default.SUCCESS, user);
    }
    catch (err) {
        if (err) {
            (0, httpError_1.default)(next, err, req, 400);
        }
        (0, httpError_1.default)(next, err, req, 500);
    }
});
const updatePersonalDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, httpResponse_1.default)(res, 200, responseMessage_1.default.SUCCESS, { 'name': 'Rehan' });
    }
    catch (err) {
        if (err) {
            (0, httpError_1.default)(next, err, req, 400);
        }
        (0, httpError_1.default)(next, err, req, 500);
    }
});
exports.default = {
    getResume,
    addSkills,
    addPersonalDetails,
    updatePersonalDetails,
    deleteSkills,
};
