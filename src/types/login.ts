import {
    loginSchema,
    registerSchema,
    forgotSchema,
    resetSchema,
} from '@/schemas';
import {z} from 'zod';

export type LoginValueType = z.infer<typeof loginSchema>;
export type RegisterValueType = z.infer<typeof registerSchema>;
export type ForgotValueType = z.infer<typeof forgotSchema>;
export type ResetValueType = z.infer<typeof resetSchema>;
