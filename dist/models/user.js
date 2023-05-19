"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    movieBookmarks: [
        {
            title: { type: String },
            thumbnail: {
                trending: { small: { type: String }, large: { type: String } },
                regular: {
                    small: { type: String },
                    medium: { type: String },
                    large: { type: String },
                },
            },
            year: { type: Number },
            category: { type: String },
            rating: { type: String },
            isBookmarked: { type: Boolean },
            isTrending: { type: Boolean },
        },
    ],
    tvBookmarks: [
        {
            title: { type: String },
            thumbnail: {
                trending: { small: { type: String }, large: { type: String } },
                regular: {
                    small: { type: String },
                    medium: { type: String },
                    large: { type: String },
                },
            },
            year: { type: Number },
            category: { type: String },
            rating: { type: String },
            isBookmarked: { type: Boolean },
            isTrending: { type: Boolean },
        },
    ],
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose_1.default.model("User", userSchema);
