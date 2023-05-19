"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const checkAuth = require("../middleware/check-auth");
const usersControllers = require("../controllers/users-controllers");
const router = express_1.default.Router();
router.post("/signup", [
    (0, express_validator_1.check)("email").normalizeEmail().isEmail(),
    (0, express_validator_1.check)("password").isLength({ min: 6 }),
], usersControllers.signup);
router.post("/login", usersControllers.login);
router.use(checkAuth);
router.post("/addMovieBookmark", usersControllers.addMovieBookmark);
router.post("/addTVBookmark", usersControllers.addTVBookmark);
router.delete("/removeMovieBookmark", usersControllers.removeMovieBookmark);
router.delete("/removeTVBookmark", usersControllers.removeTVBookmark);
exports.default = router;
