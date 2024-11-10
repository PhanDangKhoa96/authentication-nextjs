import {BloodType, UserSex} from '@prisma/client';
import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address').or(z.literal('')),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .or(z.literal('')),
    phone: z
        .string()
        .regex(/^\+?[0-9]{10,14}$/, 'Invalid phone number')
        .optional()
        .or(z.literal('')),
    image: z.string().url('Invalid image URL').optional().or(z.literal('')),
    bloodType: z.nativeEnum(BloodType).optional(),
    sex: z.nativeEnum(UserSex).optional(),
    birthday: z.date().optional(),
});

export const teacherSchema = userSchema.extend({
    subjects: z
        .array(
            z.object({
                name: z.string().min(2, 'Name must be at least 2 characters'),
                id: z.number(),
            })
        )
        .optional(),
    lessons: z.string().array().optional(),
    classes: z.string().array().optional(),
});
