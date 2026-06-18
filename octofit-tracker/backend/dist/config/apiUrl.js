"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.apiBaseUrl = void 0;
const port = Number(process.env.PORT ?? 8000);
exports.port = port;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
