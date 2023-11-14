import { Customer, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { CustomerSearchAbleFields } from './customer.constants';
import { CustomerFilterRequest } from './customer.interface';
import prisma from '../../../shared/prisma';
import { IGenericResponse } from '../../../interfaces/common';


const getAllFromDB = async (
  filters: CustomerFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Customer[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(options);
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: CustomerSearchAbleFields.map(field => ({
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

  const whereConditons: Prisma.CustomerWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.customer.findMany({
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

  const total = await prisma.room.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const CustomerService = {
  getAllFromDB,
};
