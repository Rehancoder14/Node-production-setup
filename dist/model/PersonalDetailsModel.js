"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PersonalDetailsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String },
    profession: { type: String, required: true },
    about: { type: String },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10,15}$/, 'Please enter a valid phone number']
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    linkedIn: {
        type: String,
        required: true,
        match: [/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/, 'Please enter a valid LinkedIn URL']
    },
    github: {
        type: String,
        required: true,
        match: [/^https:\/\/github\.com\/[A-Za-z0-9_-]+$/, 'Please enter a valid GitHub URL']
    },
    city: { type: String, required: true },
}, { timestamps: true });
const PersonalDetailsModel = (0, mongoose_1.model)('PersonalDetails', PersonalDetailsSchema);
exports.default = PersonalDetailsModel;
