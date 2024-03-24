import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string({required_error: 'Email is required!'}).email(),
    password: z.string({required_error: 'Password is required!'}).min(1),
});

export const registerSchema = z.object({
    name: z.string({required_error: 'Name is required!'}),
    email: z.string({required_error: 'Email is required!'}).email(),
    password: z.string({required_error: 'Password is required!'}).min(1),
});
