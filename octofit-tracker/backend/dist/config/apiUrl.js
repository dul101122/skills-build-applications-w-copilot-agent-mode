"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.apiBaseUrl = void 0;
const port = 8000;
exports.port = port;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
