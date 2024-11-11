import {z} from 'zod';

export const subjectFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Subject name must be at least 2 characters.',
    }),
});

export const lessonFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Lesson name must be at least 2 characters.',
    }),
    day: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']),
    startTime: z.date(),
    endTime: z.date(),
    subjectId: z.number(),
    teacherId: z.string(),
});
