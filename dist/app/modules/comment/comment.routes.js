"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const router = express_1.default.Router();
router.get('/:PostId', comment_controller_1.CommentController.getByIdFromDB);
router.post('/create_comment', comment_controller_1.CommentController.insertIntoDB);
exports.commentRoutes = router;
