import { Customer, Reservation } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";

import * as schedule from 'node-schedule';


// const insertIntoDB = async (data: Reservation): Promise<Reservation> => {
//   const result = await prisma.reservation.create({
//       data,
//   });
//   return result;
// };

const createReservation = async (
  customer: Customer,
  reservation: Reservation,
): Promise<any> => {

    // // Get the selected room
    // const selectedRoom = await prisma.room.findUnique({
    //   where: { id: reservation.RoomNumberID },
    // });
  
    // // Check if the room exists and is available
    // if (!selectedRoom || selectedRoom.Status !== "Available") {
    //   throw new Error("Selected room is not available for reservation.");
    // }
  
    

  const result = await prisma.$transaction(async transactionCLient => {

    const createCustomer = await transactionCLient.customer.create({
      data: customer,
    })

    const createReservations = await transactionCLient.reservation.create({
      data: {
        ...reservation,
        CustomerID: createCustomer.id, 
      },
    })
    await transactionCLient.room.update({
      where: { id: reservation.RoomNumberID },
      data: {
        Status: "Booked", 
      },
    });
    return {
      customer: createCustomer,
      reservations: createReservations,
    }
  })
  return result
}

const getAllFromDB = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Reservation[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);


  const result = await prisma.reservation.findMany({
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


const job = schedule.scheduleJob('0 1 * * *', async () => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    

    const overdueReservations = await prisma.reservation.findMany({
      where: {
        CheckOutDate: { lt: currentDate },
      },
    });
    console.log(overdueReservations)
    for (const reservation of overdueReservations) {
      // Update room state to 'free'
      await prisma.room.update({
        where: { id: reservation.id },
        data: { Status: 'Booked' },
      });
    }
  } catch (error) {
    console.error(error);
  }
});

export const ReservationService = {
  getAllFromDB,
  createReservation
};