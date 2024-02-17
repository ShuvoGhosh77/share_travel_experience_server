"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.get('/', order_controller_1.OrderController.getAllFromDB);
router.post('/create_order', order_controller_1.OrderController.insertIntoDB);
router.patch('/:id', order_controller_1.OrderController.updateOneInDB);
router.delete('/:id', order_controller_1.OrderController.deleteByIdFromDB);
exports.orderRoutes = router;
