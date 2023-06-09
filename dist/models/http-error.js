"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); // Add a "message" property
        this.code = errorCode; // Adds a "code" property
    }
}
exports.default = HttpError;
