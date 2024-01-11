import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";


const insertIntoDB = async (orderData:any): Promise<Order> => {
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
      orderItems: { // Assuming orderItems is an array of product items
        create: orderData.orderItems.map((item:any) => ({
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

const getAllFromDB = async ( ) => {
  const result = await prisma.order.findMany({
    include:{
      orderItems:true
    }
  });
  return{
      data: result
  }

}


export const OrderService = {
  insertIntoDB,
  getAllFromDB
  
  
};
