'use server';

import {db} from '@/lib/db';
import {revalidatePath} from 'next/cache';

export const createSubject = async ({name}: {name: string}) => {
    await db.subject.create({
        data: {
            name,
        },
    });

    revalidatePath('/dashboard/subjects');
};

export const getAllSubjects = async () => {
    try {
        const subjects = await db.subject.findMany();
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
            where: {
                id,
            },
        });

        revalidatePath('/dashboard/subjects');
    } catch (error) {
        console.log('error', error);
        throw new Error('Failed to delete subject');
    }
};
