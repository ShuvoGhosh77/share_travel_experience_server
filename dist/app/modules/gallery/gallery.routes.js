"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const gallery_controller_1 = require("./gallery.controller");
const router = express_1.default.Router();
router.get('/', gallery_controller_1.GalleryController.getAllFromDB);
router.post('/upload_photo', gallery_controller_1.GalleryController.insertIntoDB);
router.delete('/:id', gallery_controller_1.GalleryController.deleteByIdFromDB);
exports.galleryRoutes = router;
