import prisma from "../../../shared/prisma";
import { PostFilterRequest } from "./post.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { Posts, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { PostSearchAbleFields } from "./post.constants";
import { Request } from "express";
import { IUploadFile } from "../../../interfaces/file";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";

const insertIntoDB = async (req:Request) => {
  const file = req.file as IUploadFile;
  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
 
  if (uploadedImage) {
      req.body.PostImage = uploadedImage.secure_url
  }
  const dataToCreate = { ...req.body };
  const result = await prisma.posts.create({
    data: dataToCreate,
  });
  return result;
};


const getAllFromDB = async (
  filters: PostFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Posts[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: PostSearchAbleFields.map(field => ({
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.PostsWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.posts.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
          [options.sortBy]: options.sortOrder,
        }
        : {
          createdAt: 'desc',
        },
  });

  const total = await prisma.posts.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};


const getByIdFromDB = async (id: string): Promise<Posts | null> => {
  const result = await prisma.posts.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Posts>
): Promise<Posts> => {
  const result = await prisma.posts.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Posts> => {
  // Delete associated comments first
  await prisma.comment.deleteMany({
    where: {
      PostId: id,
    },
  });

  // Now delete the post
 const result= await prisma.posts.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PostService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB
};