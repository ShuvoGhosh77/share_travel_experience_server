
import { Guide } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";



const insertIntoDB = async (req:Request) => {
    const file = req.file as IUploadFile;
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    if (uploadedImage) {
        req.body.GuideImage = uploadedImage.secure_url
    }
    const dataToCreate = { ...req.body };
   
    const result = await prisma.guide.create({
        data: dataToCreate,
    });
    return result;
  };
  
  const getAllFromDB = async ( ) => {
    const result = await prisma.guide.findMany();
    return{
        data: result
    }

  }

  const getByIdFromDB = async (id: string): Promise<Guide | null> => {
    const result = await prisma.guide.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateOneInDB = async (
    id: string,
    payload: Partial<Guide>
): Promise<Guide> => {
    const result = await prisma.guide.update({
        where: {
            id
        },
        data: payload,
       
    });

    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Guide> => {
    const result = await prisma.guide.delete({
        where: {
            id
        }
    });
   
    return result;
};
  
  export const guideService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
    
  };

