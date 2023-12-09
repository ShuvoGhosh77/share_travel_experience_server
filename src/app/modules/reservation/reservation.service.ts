import { Customer, Reservation } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
// import schedule from 'node-schedule';

// import * as schedule from 'node-schedule';

// const insertIntoDB = async (data: Reservation): Promise<Reservation> => {
//   const result = await prisma.reservation.create({
//       data,
//   });
//   return result;
// };

const createReservation = async (
  customer: Customer,
  reservation: Reservation
): Promise<any> => {
  // // Get the selected room
  const selectedRoom = await prisma.room.findUnique({
    where: { id: reservation.RoomNumberID },
  });

  const overlappingReservation = await prisma.reservation.findFirst({
    where: {
      RoomNumberID: reservation.RoomNumberID,
      AND: [
        {
          OR: [
            {
              CheckInDate: {
                lte: reservation.CheckOutDate,
              },
              CheckOutDate: {
                gte: reservation.CheckInDate,
              },
            },
            {
              CheckInDate: {
                gte: reservation.CheckInDate,
                lte: reservation.CheckOutDate,
              },
            },
          ],
        },
      ],
    },
  });

  if (overlappingReservation) {
    throw new Error("Selected dates are not available for the specified room.");
  }

  const totalMember = reservation.TotalMember;
  const roomCapacity = parseInt(selectedRoom.Capacity);

  if (totalMember > roomCapacity) {
    throw new Error("TotalMember greater than room Capacity");
  }
  const result = await prisma.$transaction(async transactionCLient => {
    const createCustomer = await transactionCLient.customer.create({
      data: customer,
    });

    const createReservations = await transactionCLient.reservation.create({
      data: {
        ...reservation,
        CustomerID: createCustomer.id,
      },
    });
    await transactionCLient.room.update({
      where: { id: reservation.RoomNumberID },
      data: {
        Status: 'Booked',
      },
    });
    return {
      customer: createCustomer,
      reservations: createReservations,
    };
  });
  return result;
};
const getAllFromDB = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Reservation[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.reservation.findMany({
    include: {
      RoomNumber: true,
    },
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

// schedule.scheduleJob('* * * * *', async () => {
//   try {
//     const currentDate = new Date().toISOString().split('T')[0];

//     const overdueReservations = await prisma.reservation.findMany({
//       where: {
//         CheckOutDate: { lt: currentDate },
//       },
//     });
    
//     for (const reservation of overdueReservations) {
//       // Update room state to 'free'
//       await prisma.room.update({
//         where: { id: reservation.RoomNumberID },
//         data: { Status: 'Available' },
//       });

//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

export const ReservationService = {
  getAllFromDB,
  createReservation,
};
