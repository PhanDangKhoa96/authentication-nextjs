'use server';

import {db} from '@/lib/db';
import {revalidatePath} from 'next/cache';

export const createSubject = async ({name}: {name: string}) => {
    if (!name?.trim()) {
        return { success: false, error: 'Subject name is required' };
    }

    const existedSubject = await db.subject.findUnique({
        where: {
            name,
        },
    });

    if (existedSubject) {
        return {success: false, error: 'Subject name already exists'};
    }

    await db.subject.create({
        data: {
            name,
        },
    });

    revalidatePath('/dashboard/subjects');

    return {success: true, error: null};
};

export const getAllSubjects = async () => {
    try {
        const subjects = await db.subject.findMany({include: {teachers: true}});

        revalidatePath('/dashboard/subjects');

        return subjects;
    } catch (error) {
        console.log('error', error);
        return null;
    }
};

export const deleteSubject = async ({id}: {id: number}) => {
    try {
        await db.subject.delete({
            where: { id },
        });
        revalidatePath('/dashboard/subjects');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to delete subject:', error);
        return { success: false, error: 'Failed to delete subject' };
    }
};

export const updateSubject = async ({id, name}: {id: number; name: string}) => {
    try {
        const existedSubject = await db.subject.findUnique({
            where: {
                name,
            },
        });

        if (existedSubject) {
            return {success: false, error: 'Subject name already exists'};
        }
        await db.subject.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });

        revalidatePath('/dashboard/subjects');

        return {success: true, error: null};
    } catch (error) {
        console.log('error', error);
        throw new Error('Failed to update subject');
    }
};
