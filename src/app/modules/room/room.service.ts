import { Prisma, Room } from "@prisma/client";
import prisma from "../../../shared/prisma";

import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { RoomFilterRequest } from "./room.interface";
import { RoomSearchAbleFields } from "./room.constants";



const insertIntoDB = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
      data,
  });
  return result;
};


const getAllFromDB = async (
  filters: RoomFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(options)
  const andConditons = [];

  if (searchTerm) {
      andConditons.push({
          OR: RoomSearchAbleFields.map((field) => ({
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

  /**
   * person = { name: 'fahim' }
   * name = person[name]
   * 
   */

  const whereConditons: Prisma.RoomWhereInput =
      andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.room.findMany({
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

  const total = await prisma.room.count();

  return {
      meta: {
          total,
          page,
          limit
      },
      data: result
  }
}

const getByIdFromDB = async (id: string): Promise<Room | null> => {
    const result = await prisma.room.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateOneInDB = async (
    id: string,
    payload: Partial<Room>
): Promise<Room> => {
    const result = await prisma.room.update({
        where: {
            id
        },
        data: payload,
       
    });

    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Room> => {
    const result = await prisma.room.delete({
        where: {
            id
        }
    });
   
    return result;
};

export const RoomService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB
};