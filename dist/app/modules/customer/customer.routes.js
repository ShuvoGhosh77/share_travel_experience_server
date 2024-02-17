"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("./customer.controller");
const router = express_1.default.Router();
router.get('/', customer_controller_1.CustomerController.getAllFromDB);
router.post('/create_customer', customer_controller_1.CustomerController.insertIntoDB);
exports.customerRoutes = router;
