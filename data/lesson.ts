'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { LessonWithRelations } from '@/types/users';


export const createLesson = async (data: Partial<LessonWithRelations>) => {
    try {
        await db.lesson.create({
            data: {
                name: data.name!,
                day: data.day!,
                startTime: data.startTime!,
                endTime: data.endTime!,
                subjectId: data.subjectId!,
                teacherId: data.teacherId!,
            },
        });

        revalidatePath('/dashboard/lessons');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to create lesson:', error);
        return { success: false, error: 'Failed to create lesson' };
    }
};

export const getAllLessons = async (): Promise<LessonWithRelations[]> => {
    try {
        const lessons = await db.lesson.findMany({
            include: {
                subject: true,
                teacher: true,
            },
            orderBy: {
                day: 'asc',
            },
        });
        return lessons;
    } catch (error) {
        console.error('Failed to fetch lessons:', error);
        throw new Error('Failed to fetch lessons');
    }
};

export const deleteLesson = async ({ id }: { id: number }) => {
    try {
        await db.lesson.delete({
            where: { id },
        });
        revalidatePath('/dashboard/lessons');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to delete lesson:', error);
        return { success: false, error: 'Failed to delete lesson' };
    }
};

export const updateLesson = async (data: LessonWithRelations) => {
    try {
        await db.lesson.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                subjectId: data.subjectId,
                teacherId: data.teacherId,
            },
        });

        revalidatePath('/dashboard/lessons');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to update lesson:', error);
        return { success: false, error: 'Failed to update lesson' };
    }
}; 