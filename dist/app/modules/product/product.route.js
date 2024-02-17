"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const router = express_1.default.Router();
router.get('/', product_controller_1.ProductController.getAllFromDB);
router.get('/:id', product_controller_1.ProductController.getByIdFromDB);
router.post('/create_product', FileUploadHelper_1.FileUploadHelper.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return product_controller_1.ProductController.insertIntoDB(req, res, next);
});
router.patch('/:id', product_controller_1.ProductController.updateOneInDB);
router.delete('/:id', product_controller_1.ProductController.deleteByIdFromDB);
exports.productRoutes = router;
