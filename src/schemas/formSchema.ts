import {z} from 'zod';

export const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Subject name must be at least 2 characters.',
    }),
});
