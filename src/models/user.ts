import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("User", userSchema);
