"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const router = express_1.default.Router();
// router.get('/', CommentController.getAllFromDB);
router.get('/', post_controller_1.PostController.getAllFromDB);
router.get('/:id', post_controller_1.PostController.getByIdFromDB);
router.post('/create_post', FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return post_controller_1.PostController.insertIntoDB(req, res, next);
});
router.patch('/:id', post_controller_1.PostController.updateOneInDB);
router.delete('/:id', post_controller_1.PostController.deleteByIdFromDB);
exports.postRoutes = router;
