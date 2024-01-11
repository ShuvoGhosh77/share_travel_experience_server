import { Customer, Reservation } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';


const createReservation = async (
  customer: Customer,
  reservation: Reservation
): Promise<any> => {
  // // Get the selected room

  const overlappingReservation = await prisma.reservation.findFirst({
    where: {
      GuideID: reservation.GuideID,
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
    throw new Error('Selected dates are not available for the specified room.');
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
    await transactionCLient.guide.update({
      where: { id: reservation.GuideID },
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
      customer: true,
      guide: true,
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

  const total = await prisma.reservation.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Reservation>
): Promise<Reservation> => {
  const result = await prisma.reservation.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Reservation> => {
  const result = await prisma.reservation.delete({
    where: {
      id,
    },
  });

  return result;
};




export const ReservationService = {
  getAllFromDB,
  createReservation,
  deleteByIdFromDB,
  updateOneInDB,
};
