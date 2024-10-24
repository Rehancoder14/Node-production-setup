"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SkillSchema = new mongoose_1.Schema({
    skill: { type: String, required: true },
    proficiency: {
        type: String, unique: true,
        required: true,
        enum: ['good', 'expert', 'professional'],
        default: 'expert',
    },
}, { timestamps: true });
const SkillsModel = (0, mongoose_1.model)('Skills', SkillSchema);
exports.default = SkillsModel;
