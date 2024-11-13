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

export const eventSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start time",
    }),
    endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid end time",
    }),
  })

export const announcementSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date",
    }),
})
