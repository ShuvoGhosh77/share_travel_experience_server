import { z } from 'zod';

const create = z.object({
    body: z.object({
        RoomNumber: z.string({
            required_error: 'RoomNumber is required'
        }),
        PricePerNight: z.number({
            required_error: 'PricePerNight is required'
        }),
        Description: z.string({
            required_error: 'Description is required'
        }),
        Capacity: z.string({
            required_error: 'Capacity is required'
        }),
        Facilities: z.array(z.string(), {
            required_error: 'Facilities is required and must be an array of strings'
        }),

    })
});

const update = z.object({
    body: z.object({
        RoomNumber: z.string().optional(),
        PricePerNight: z.number().optional(),
        Description: z.string().optional(),
        Capacity: z.string().optional(),
        Facilities: z.array(z.string()).optional()
    })
});

export const RoomValidation = {
    create,
    update
};