
import { Customer, Prisma} from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";

import { CustomerFilterRequest } from "./customer.interface";
import prisma from "../../../shared/prisma";
import { CustomerSearchAbleFields } from "./customer.constants";



const insertIntoDB = async (data: Customer): Promise<Customer> => {
    const result = await prisma.customer.create({
        data,
    });
    return result;
  };
  

const getAllFromDB = async (
    filters: CustomerFilterRequest,
    options: IPaginationOptions
  ): Promise<IGenericResponse<Customer[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    console.log(options)
    const andConditons = [];
  
    if (searchTerm) {
        andConditons.push({
            OR: CustomerSearchAbleFields.map((field) => ({
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
 
    const whereConditons: Prisma.CustomerWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};
  
    const result = await prisma.customer.findMany({
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


const getByIdFromDB = async (id: string): Promise<Customer | null> => {
    const result = await prisma.customer.findUnique({
        where: {
            id
        }
    });
    return result;
};

const updateOneInDB = async (
    id: string,
    payload: Partial<Customer>
): Promise<Customer> => {
    const result = await prisma.customer.update({
        where: {
            id
        },
        data: payload,
       
    });

    return result;
};

const deleteByIdFromDB = async (id: string): Promise<Customer> => {
    const result = await prisma.customer.delete({
        where: {
            id
        }
    });
   
    return result;
};
  
  export const customerService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
    
  };

