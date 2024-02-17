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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const comparePassword_1 = require("../../../helpers/comparePassword");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { Email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            Email
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield (0, comparePassword_1.isPasswordMatched)(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { Email: email, Role, FullName, Number } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, Role, FullName, Number }, 'Secret', 36000);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email, Role }, 'Secret', 36000);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, 'Secret');
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { Email } = verifiedToken;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            Email
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.Email,
        role: isUserExist.Role,
    }, 'Secret', 36000);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    loginUser,
    refreshToken
};
