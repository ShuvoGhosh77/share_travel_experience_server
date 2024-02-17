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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const order_constants_1 = require("./order.constants");
const insertIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const createdOrder = yield prisma_1.default.order.create({
        data: {
            shippingAddress: orderData.shippingAddress,
            name: orderData.name,
            phone: orderData.phone,
            email: orderData.email,
            paymentMethod: orderData.paymentMethod,
            subtotal: orderData.subtotal,
            deliveryCharge: orderData.deliveryCharge,
            totalPrice: orderData.totalPrice,
            orderItems: {
                // Assuming orderItems is an array of product items
                create: orderData.orderItems.map((item) => ({
                    product: item.product,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
        include: {
            orderItems: true,
        },
    });
    return createdOrder;
});
// const getAllFromDB = async ( ) => {
//   const result = await prisma.order.findMany({
//     include:{
//       orderItems:true
//     }
//   });
//   return{
//       data: result
//   }
// }
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditons = [];
    if (searchTerm) {
        andConditons.push({
            OR: order_constants_1.OrderSearchAbleFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.order.findMany({
        include: {
            orderItems: true
        },
        where: whereConditons,
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
    const total = yield prisma_1.default.order.count();
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
    const result = yield prisma_1.default.order.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete associated orderItem first
    yield prisma_1.default.orderItem.deleteMany({
        where: {
            orderId: id,
        },
    });
    // Now delete the Order
    const result = yield prisma_1.default.order.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    updateOneInDB,
    deleteByIdFromDB,
};
