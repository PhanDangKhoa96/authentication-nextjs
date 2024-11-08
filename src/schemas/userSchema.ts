import {BloodType, UserSex} from '@prisma/client';
import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z
        .string()
        .email('Invalid email address')
        .or(z.literal('')),
    phone: z
        .string()
        .regex(/^\+?[0-9]{10,14}$/, 'Invalid phone number')
        .optional()
        .or(z.literal('')),
    img: z.string().url('Invalid image URL').optional().or(z.literal('')),
    bloodType: z.nativeEnum(BloodType),
    sex: z.nativeEnum(UserSex),
    birthday: z.date().optional(),
});

export const teacherSchema = userSchema.extend({
    subjects: z.string().array().optional(),
    lessons: z.string().array().optional(),
    classes: z.string().array().optional(),
});
