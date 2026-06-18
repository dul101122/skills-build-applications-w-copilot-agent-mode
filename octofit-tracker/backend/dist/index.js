"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const apiUrl_1 = require("./config/apiUrl");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: apiUrl_1.apiBaseUrl });
});
app.use('/api', routes_1.default);
const start = async () => {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(apiUrl_1.port, () => {
            console.log(`OctoFit backend listening at ${apiUrl_1.apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
};
void start();
