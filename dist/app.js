"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: "./.env" });
const users_routes_1 = __importDefault(require("./routes/users-routes"));
const http_error_1 = __importDefault(require("./models/http-error"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
app.use("/api/users", users_routes_1.default);
app.use((req, res, next) => {
    const error = new http_error_1.default("Could not find this route.", 404);
    throw error;
});
app.use((error, req, res, next) => {
    if (req.body) {
        console.log(req.body);
    }
    if (res.headersSent) {
        return next(error);
    }
    res.status(500);
    res.json({ message: error.message || "An unknown error occurred!" });
});
mongoose_1.default
    .connect(process.env.DB_URL)
    .then(() => {
    app.listen(process.env.PORT || 5000);
})
    .catch((err) => {
    console.log(err);
});
