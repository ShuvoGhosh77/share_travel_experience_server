"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const reservation_controller_1 = require("./reservation.controller");
const router = express_1.default.Router();
router.get('/', reservation_controller_1.ReservationController.getAllFromDB);
router.post('/create_reservation', reservation_controller_1.ReservationController.insertIntoDB);
router.patch('/:id', reservation_controller_1.ReservationController.updateOneInDB);
router.delete('/:id', reservation_controller_1.ReservationController.deleteByIdFromDB);
exports.ReservationRoutes = router;
