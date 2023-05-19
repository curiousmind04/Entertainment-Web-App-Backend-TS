"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_error_1 = __importDefault(require("../models/http-error"));
const mongoose_1 = __importDefault(require("mongoose"));
const User = require("../models/user");
const addMovieBookmark = async (req, res, next) => {
    const { bookmark } = req.body;
    let user;
    try {
        user = await User.findById(req.userData.userId);
    }
    catch (err) {
        const error = new http_error_1.default("Creating place failed, please try again.", 500);
        return next(error);
    }
    if (!user) {
        const error = new http_error_1.default("Could not find user for provided id.", 404);
        return next(error);
    }
    try {
        const sess = await mongoose_1.default.startSession();
        sess.startTransaction();
        user.movieBookmarks.push(bookmark);
        await user.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        const error = new http_error_1.default("Adding movie bookmark failed, please try again", 500);
        return next(error);
    }
    res.status(201).json({ movieBookmark: bookmark });
};
const removeMovieBookmark = async (req, res, next) => {
    const { bookmark } = req.body;
    let user;
    try {
        user = await User.findById(req.userData.userId);
    }
    catch (err) {
        const error = new http_error_1.default("Creating place failed, please try again.", 500);
        return next(error);
    }
    if (!user) {
        const error = new http_error_1.default("Could not find user for provided id.", 404);
        return next(error);
    }
    try {
        const sess = await mongoose_1.default.startSession();
        sess.startTransaction();
        user.movieBookmarks.pull(bookmark);
        await user.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        const error = new http_error_1.default("Something went wrong, could not delete bookmark.", 500);
        return next(error);
    }
    res.status(200).json({ message: "Deleted bookmark." });
};
const addTVBookmark = async (req, res, next) => {
    const { bookmark } = req.body;
    let user;
    try {
        user = await User.findById(req.userData.userId);
    }
    catch (err) {
        const error = new http_error_1.default("Creating place failed, please try again.", 500);
        return next(error);
    }
    if (!user) {
        const error = new http_error_1.default("Could not find user for provided id.", 404);
        return next(error);
    }
    try {
        const sess = await mongoose_1.default.startSession();
        sess.startTransaction();
        user.tvBookmarks.push(bookmark);
        await user.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        const error = new http_error_1.default("Adding movie bookmark failed, please try again", 500);
        return next(error);
    }
    res.status(201).json({ tvBookmark: bookmark });
};
const removeTVBookmark = async (req, res, next) => {
    const { bookmark } = req.body;
    let user;
    try {
        user = await User.findById(req.userData.userId);
    }
    catch (err) {
        const error = new http_error_1.default("Creating place failed, please try again.", 500);
        return next(error);
    }
    if (!user) {
        const error = new http_error_1.default("Could not find user for provided id.", 404);
        return next(error);
    }
    try {
        const sess = await mongoose_1.default.startSession();
        sess.startTransaction();
        user.tvBookmarks.pull(bookmark);
        await user.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        const error = new http_error_1.default("Something went wrong, could not delete bookmark.", 500);
        return next(error);
    }
    res.status(200).json({ message: "Deleted bookmark." });
};
const signup = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.default("Invalid inputs passed, please check your data.", 422));
    }
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        const error = new http_error_1.default("Signing up failed, please try again later.", 500);
        return next(error);
    }
    if (existingUser) {
        const error = new http_error_1.default("User exists already, please login instead.", 422);
        return next(error);
    }
    let hashedPassword;
    try {
        hashedPassword = await bcryptjs_1.default.hash(password, 12);
    }
    catch (err) {
        const error = new http_error_1.default("Could not create user, please try again.", 500);
        return next(error);
    }
    const createdUser = new User({
        email,
        password: hashedPassword,
        movieBookmarks: [],
        tvBookmarks: [],
    });
    try {
        await createdUser.save();
    }
    catch (err) {
        const error = new http_error_1.default("Signing up failed, please try again", 500);
        return next(error);
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_KEY, { expiresIn: "1h" });
    }
    catch (err) {
        const error = new http_error_1.default("Signing up failed, please try again later", 500);
        return next(error);
    }
    res.status(201).json({
        userId: createdUser.id,
        email: createdUser.email,
        token: token,
        movieBookmarks: createdUser.movieBookmarks,
        tvBookmarks: createdUser.tvBookmarks,
    });
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        const error = new http_error_1.default("Logging in failed, please try again later.", 500);
        return next(error);
    }
    if (!existingUser) {
        const error = new http_error_1.default("Invalid credentials, could not log you in.", 403);
        return next(error);
    }
    let isValidPassword = false;
    try {
        isValidPassword = await bcryptjs_1.default.compare(password, existingUser.password);
    }
    catch (err) {
        const error = new http_error_1.default("Could not log you in, please check your credentials and try again.", 500);
        return next(error);
    }
    if (!isValidPassword) {
        const error = new http_error_1.default("Invalid credentials, could not log you in.", 403);
        return next(error);
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY, { expiresIn: "1h" });
    }
    catch (err) {
        const error = new http_error_1.default("Logging in failed, please try again later", 500);
        return next(error);
    }
    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
        movieBookmarks: existingUser.movieBookmarks,
        tvBookmarks: existingUser.tvBookmarks,
    });
};
exports.signup = signup;
exports.login = login;
exports.addMovieBookmark = addMovieBookmark;
exports.addTVBookmark = addTVBookmark;
exports.removeMovieBookmark = removeMovieBookmark;
exports.removeTVBookmark = removeTVBookmark;
