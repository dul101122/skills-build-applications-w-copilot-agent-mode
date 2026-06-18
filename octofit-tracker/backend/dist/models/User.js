"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    weeklyGoalMinutes: { type: Number, required: true },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
