'use server';

import { db } from '@/lib/db';
import { createNewUser } from './user';
import { Subject, Teacher } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { TeacherWithRelations } from '@/types/users';

export const createTeacher = async (data: TeacherWithRelations) => {
    try {
        const existedTeacher = await db.teacher.findFirst({
            where: {
                email: data.email,
            },
        });

        if (existedTeacher) {
            return { success: false, error: 'Teacher email already exists' };
        }

        const harshedPassword = await bcrypt.hash(data?.password, 10);

        await db.teacher.create({
            data: {
                ...data,
                password: harshedPassword,
                role: 'TEACHER',
                subjects: {
                    connect: data.subjects?.map((subject) => ({
                        id: subject.id,
                    })),
                },
            },
            include: {
                subjects: true,
            },
        });

        revalidatePath(`/dashboard/teachers`);
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to create teacher:', error);
        return { success: false, error: 'Failed to create teacher' };
    }
};

export const getAllTeachers = async (): Promise<TeacherWithRelations[]> => {
    try {
        const teachers = await db.teacher.findMany({
            include: {
                subjects: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return teachers;
    } catch (error) {
        console.error('Failed to fetch teachers:', error);
        throw new Error('Failed to fetch teachers');
    }
};

export const deleteTeacher = async ({ id }: { id: string }) => {
    try {
        await db.teacher.delete({
            where: { id },
        });
        revalidatePath('/dashboard/teachers');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to delete teacher:', error);
        return { success: false, error: 'Failed to delete teacher' };
    }
};

export const updateTeacher = async (data: TeacherWithRelations) => {
    try {
        const existedTeacher = await db.teacher.findFirst({
            where: {
                email: data.email,
                NOT: {
                    id: data.id
                }
            },
        });

        if (existedTeacher) {
            return { success: false, error: 'Teacher email already exists' };
        }

        const updateData = {
            ...data,
            subjects: {
                set: data.subjects?.map((subject) => ({
                    id: subject.id,
                }))
            },
        };

        // Only update password if it's provided
        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        await db.teacher.update({
            where: {
                id: data.id,
            },
            data: updateData,
            include: {
                subjects: true,
            },
        });

        revalidatePath('/dashboard/teachers');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to update teacher:', error);
        return { success: false, error: 'Failed to update teacher' };
    }
};
