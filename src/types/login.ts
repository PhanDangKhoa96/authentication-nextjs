import {loginSchema, registerSchema} from '@/schemas';
import {z} from 'zod';

export type LoginValueType = z.infer<typeof loginSchema>;
export type RegisterValueType = z.infer<typeof registerSchema>;
