"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_routes_1 = require("../modules/comment/comment.routes");
const post_route_1 = require("../modules/posts/post.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const customer_route_1 = require("../modules/customer/customer.route");
const reservation_routes_1 = require("../modules/reservation/reservation.routes");
const guide_route_1 = require("../modules/guide/guide.route");
const product_route_1 = require("../modules/product/product.route");
const order_route_1 = require("../modules/order/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/comment',
        route: comment_routes_1.commentRoutes
    },
    {
        path: '/post',
        route: post_route_1.postRoutes
    },
    {
        path: '/user',
        route: user_route_1.userRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes
    },
    {
        path: "/customer",
        route: customer_route_1.customerRoutes
    },
    {
        path: "/reservation",
        route: reservation_routes_1.ReservationRoutes
    },
    {
        path: "/guide",
        route: guide_route_1.guideRoutes
    },
    {
        path: "/product",
        route: product_route_1.productRoutes
    },
    {
        path: "/order",
        route: order_route_1.orderRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
