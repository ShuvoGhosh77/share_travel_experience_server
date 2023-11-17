import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { Email, password } = payload;
   
  
    const isUserExist = await prisma.user.findUnique({
        where: {
          Email
        },
      });
  
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
  
    const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

    if (
      isUserExist.password && isPasswordValid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }
  
    //create access token & refresh token
  
    const { Email:email, Role } = isUserExist;
    const accessToken = jwtHelpers.createToken(
      { email, Role },
      'Secret',
      { expiresIn: 60 * 60 }
    );
  
    const refreshToken = jwtHelpers.createToken(
      { email, Role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
  
    return {
      accessToken,
      refreshToken,
    };
  };


  export const AuthService = {
    loginUser
    };