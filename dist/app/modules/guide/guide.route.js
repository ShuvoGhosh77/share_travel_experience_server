"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guideRoutes = void 0;
const express_1 = __importDefault(require("express"));
const guide_controller_1 = require("./guide.controller");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const router = express_1.default.Router();
router.get('/', guide_controller_1.guideController.getAllFromDB);
router.get('/:id', guide_controller_1.guideController.getByIdFromDB);
router.post('/create_guide', FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return guide_controller_1.guideController.insertIntoDB(req, res, next);
});
router.patch('/:id', guide_controller_1.guideController.updateOneInDB);
router.delete('/:id', guide_controller_1.guideController.deleteByIdFromDB);
exports.guideRoutes = router;
