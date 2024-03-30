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

export const forgotSchema = z.object({
    email: z.string({required_error: 'Email is required!'}).email(),
});

export const resetSchema = z
    .object({
        password: z.string({required_error: 'Password is required!'}).min(1),
        confirmationPassword: z
            .string({required_error: 'Confirmation password is required!'})
            .min(1),
    })
    .refine(
        ({password, confirmationPassword}) => password === confirmationPassword,
        {message: 'Passwords dont match', path: ['confirmationPassword']}
    );
