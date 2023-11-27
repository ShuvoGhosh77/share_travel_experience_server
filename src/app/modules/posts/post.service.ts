import { Request } from "express";

import { IUploadFile } from "../../../interfaces/file";
import prisma from "../../../shared/prisma";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";

const insertIntoDB = async (req: Request)=> {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    if (uploadedImage) {
        req.body.PostImage = uploadedImage.secure_url
    }  
    const result = await prisma.posts.create({
        data: req.body,
    });
    return result;
};


export const PostService = {
    insertIntoDB,
};