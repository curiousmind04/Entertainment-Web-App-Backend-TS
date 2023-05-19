import express from "express";
import { check } from "express-validator";
const checkAuth = require("../middleware/check-auth");
const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

router.use(checkAuth);

router.post("/addMovieBookmark", usersControllers.addMovieBookmark);

router.post("/addTVBookmark", usersControllers.addTVBookmark);

router.delete("/removeMovieBookmark", usersControllers.removeMovieBookmark);

router.delete("/removeTVBookmark", usersControllers.removeTVBookmark);

export default router;
