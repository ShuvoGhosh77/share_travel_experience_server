import { Customer, Reservation } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";


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

    // Get the selected room
    const selectedRoom = await prisma.room.findUnique({
      where: { id: reservation.RoomNumberID },
    });
  
    // Check if the room exists and is available
    if (!selectedRoom || selectedRoom.Status !== "Available") {
      throw new Error("Selected room is not available for reservation.");
    }
  
    

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

export const ReservationService = {
  getAllFromDB,
  createReservation
};