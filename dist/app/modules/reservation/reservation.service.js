"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createReservation = (customer, reservation) => __awaiter(void 0, void 0, void 0, function* () {
    // // Get the selected room
    const overlappingReservation = yield prisma_1.default.reservation.findFirst({
        where: {
            GuideID: reservation.GuideID,
            AND: [
                {
                    OR: [
                        {
                            CheckInDate: {
                                lte: reservation.CheckOutDate,
                            },
                            CheckOutDate: {
                                gte: reservation.CheckInDate,
                            },
                        },
                        {
                            CheckInDate: {
                                gte: reservation.CheckInDate,
                                lte: reservation.CheckOutDate,
                            },
                        },
                    ],
                },
            ],
        },
    });
    if (overlappingReservation) {
        throw new Error('Selected dates are not available for the specified room.');
    }
    const result = yield prisma_1.default.$transaction((transactionCLient) => __awaiter(void 0, void 0, void 0, function* () {
        const createCustomer = yield transactionCLient.customer.create({
            data: customer,
        });
        const createReservations = yield transactionCLient.reservation.create({
            data: Object.assign(Object.assign({}, reservation), { CustomerID: createCustomer.id }),
        });
        yield transactionCLient.guide.update({
            where: { id: reservation.GuideID },
            data: {
                Status: 'Booked',
            },
        });
        return {
            customer: createCustomer,
            reservations: createReservations,
        };
    }));
    return result;
});
const getAllFromDB = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.reservation.findMany({
        include: {
            customer: true,
            guide: true,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.reservation.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reservation.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reservation.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.ReservationService = {
    getAllFromDB,
    createReservation,
    deleteByIdFromDB,
    updateOneInDB,
};
