
import {  Prisma, Product} from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";

import prisma from "../../../shared/prisma";

import { ProductFilterRequest } from "./product.interface";
import { ProductSearchAbleFields } from "./product.constants";
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
    const result = await prisma.product.create({
        data: dataToCreate,
    });
    return result;
  };
  

const getAllFromDB = async (
    filters: ProductFilterRequest,
    options: IPaginationOptions
  ): Promise<IGenericResponse<Product[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
  
    const andConditons = [];
  
    if (searchTerm) {
        andConditons.push({
            OR: ProductSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }
  
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }
 
    const whereConditons: Prisma.ProductWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};
  
    const result = await prisma.product.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createdAt: 'desc'
            }
    });
  
    const total = await prisma.product.count();
  
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
  }


const getByIdFromDB = async (id: string): Promise<Product | null> => {
    const result = await prisma.product.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateOneInDB = async (
    id: string,
    payload: Partial<Product>
): Promise<Product> => {
    const result = await prisma.product.update({
        where: {
            id
        },
        data: payload,
       
    });

    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Product> => {
    const result = await prisma.product.delete({
        where: {
            id
        }
    });
   
    return result;
};
  
  export const ProductService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
    
  };

