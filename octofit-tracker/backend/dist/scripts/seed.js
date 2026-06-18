"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const seed = async () => {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        models_1.ActivityModel.deleteMany({}),
        models_1.LeaderboardModel.deleteMany({}),
        models_1.WorkoutModel.deleteMany({}),
        models_1.UserModel.deleteMany({}),
        models_1.TeamModel.deleteMany({}),
    ]);
    const [trailBlazers, coreCrew] = await models_1.TeamModel.create([
        {
            name: 'Trail Blazers',
            mascot: 'OctoStride',
            city: 'Seattle',
            weeklyGoalMinutes: 900,
        },
        {
            name: 'Core Crew',
            mascot: 'Plankton',
            city: 'Austin',
            weeklyGoalMinutes: 750,
        },
    ]);
    const [maya, jordan, priya] = await models_1.UserModel.create([
        {
            username: 'maya_runner',
            displayName: 'Maya Chen',
            email: 'maya.chen@example.com',
            team: trailBlazers._id,
            fitnessLevel: 'advanced',
            weeklyGoalMinutes: 360,
        },
        {
            username: 'jordan_lifts',
            displayName: 'Jordan Ellis',
            email: 'jordan.ellis@example.com',
            team: coreCrew._id,
            fitnessLevel: 'intermediate',
            weeklyGoalMinutes: 300,
        },
        {
            username: 'priya_moves',
            displayName: 'Priya Shah',
            email: 'priya.shah@example.com',
            team: trailBlazers._id,
            fitnessLevel: 'beginner',
            weeklyGoalMinutes: 180,
        },
    ]);
    await models_1.ActivityModel.create([
        {
            user: maya._id,
            activityType: 'Trail run',
            durationMinutes: 52,
            caloriesBurned: 560,
            completedAt: new Date('2026-06-15T13:30:00Z'),
        },
        {
            user: jordan._id,
            activityType: 'Strength training',
            durationMinutes: 45,
            caloriesBurned: 410,
            completedAt: new Date('2026-06-16T22:00:00Z'),
        },
        {
            user: priya._id,
            activityType: 'Yoga flow',
            durationMinutes: 30,
            caloriesBurned: 180,
            completedAt: new Date('2026-06-17T12:15:00Z'),
        },
    ]);
    await models_1.LeaderboardModel.create([
        { user: maya._id, rank: 1, totalMinutes: 412, points: 1240, streakDays: 9 },
        { user: jordan._id, rank: 2, totalMinutes: 335, points: 980, streakDays: 6 },
        { user: priya._id, rank: 3, totalMinutes: 205, points: 620, streakDays: 4 },
    ]);
    await models_1.WorkoutModel.create([
        {
            title: 'Hill Sprint Builder',
            description: 'Intervals for building speed and climbing endurance.',
            difficulty: 'advanced',
            durationMinutes: 40,
            focusArea: 'Cardio',
            recommendedFor: [maya._id],
        },
        {
            title: 'Total Body Strength Circuit',
            description: 'Compound lifts and core work for balanced strength.',
            difficulty: 'intermediate',
            durationMinutes: 45,
            focusArea: 'Strength',
            recommendedFor: [jordan._id],
        },
        {
            title: 'Foundations Mobility Flow',
            description: 'Low-impact mobility work for recovery and consistency.',
            difficulty: 'beginner',
            durationMinutes: 25,
            focusArea: 'Mobility',
            recommendedFor: [priya._id],
        },
    ]);
    console.log('Seed data inserted for users, teams, activities, leaderboard, and workouts.');
};
seed()
    .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
