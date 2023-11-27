import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PostService } from "./post.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await PostService.insertIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post  Create successfully',
        data: result
    });
    
  });



  export const PostController = {
    insertIntoDB,
   
  };