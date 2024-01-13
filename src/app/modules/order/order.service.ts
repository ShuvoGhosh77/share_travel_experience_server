import { Order, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { OrderSearchAbleFields } from './order.constants';
import { OrderFilterRequest } from './order.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';

const insertIntoDB = async (orderData: any): Promise<Order> => {
  const createdOrder = await prisma.order.create({
    data: {
      shippingAddress: orderData.shippingAddress,
      name: orderData.name,
      phone: orderData.phone,
      email: orderData.email,
      paymentMethod: orderData.paymentMethod,
      subtotal: orderData.subtotal,
      deliveryCharge: orderData.deliveryCharge,
      totalPrice: orderData.totalPrice,
      orderItems: {
        // Assuming orderItems is an array of product items
        create: orderData.orderItems.map((item: any) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      orderItems: true,
    },
  });

  return createdOrder;
};

// const getAllFromDB = async ( ) => {
//   const result = await prisma.order.findMany({
//     include:{
//       orderItems:true
//     }
//   });
//   return{
//       data: result
//   }

// }
const getAllFromDB = async (
  filters: OrderFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: OrderSearchAbleFields.map(field => ({
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

  const whereConditons: Prisma.OrderWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.order.findMany({
    include: {
      orderItems:true
    },
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

  const total = await prisma.order.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const deleteByIdFromDB = async (id:number): Promise<Order> => {
  // Delete associated orderItem first
  await prisma.orderItem.deleteMany({
    where: {
      orderId: id,
    },
  });

  // Now delete the Order
  const result = await prisma.order.delete({
    where: {
      id,
    },
  });

  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  deleteByIdFromDB,
};
