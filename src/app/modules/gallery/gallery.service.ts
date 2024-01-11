import { Gallery, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { GalleryFilterRequest } from "./gallery.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { GallerySearchAbleFields } from "./gallery.constants";


const insertIntoDB = async (data: Gallery): Promise<Gallery> => {
  console.log(data)

    const result = await prisma.gallery.create({
      data
    });
    return result;
  };
  

  const getAllFromDB = async (
    filters: GalleryFilterRequest,
    options: IPaginationOptions
  ): Promise<IGenericResponse<Gallery[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditons = [];
  
    if (searchTerm) {
      andConditons.push({
        OR: GallerySearchAbleFields.map(field => ({
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
  
    const whereConditons: Prisma.GalleryWhereInput =
      andConditons.length > 0 ? { AND: andConditons } : {};
  
    const result = await prisma.gallery.findMany({
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
  
    const total = await prisma.gallery.count();
  
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  };

  const deleteByIdFromDB = async (id: string): Promise<Gallery> => {
    const result = await prisma.gallery.delete({
      where: {
        id,
      },
    });
  
    return result;
  };
  

  export const GalleryService = {
    insertIntoDB,
    getAllFromDB,
    deleteByIdFromDB
    
  };