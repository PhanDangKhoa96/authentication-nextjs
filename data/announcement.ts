'use server';

import { db } from '@/lib/db';
import { AnnouncementWithRelations } from '@/types/users';
import { revalidatePath } from 'next/cache';


export const createAnnouncement = async (data: Omit<AnnouncementWithRelations, 'id'>) => {
    try {
        await db.announcement.create({
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
            },
        });

        revalidatePath('/dashboard/announcements');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to create announcement:', error);
        return { success: false, error: 'Failed to create announcement' };
    }
};

export const getAllAnnouncements = async (): Promise<AnnouncementWithRelations[]> => {
    try {
        const announcements = await db.announcement.findMany({
            orderBy: {
                date: 'desc',
            },
        });
        return announcements;
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        throw new Error('Failed to fetch announcements');
    }
};

export const deleteAnnouncement = async ({ id }: { id: number }) => {
    try {
        await db.announcement.delete({
            where: { id },
        });
        revalidatePath('/dashboard/announcements');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to delete announcement:', error);
        return { success: false, error: 'Failed to delete announcement' };
    }
};

export const updateAnnouncement = async (data: AnnouncementWithRelations) => {
    try {
        await db.announcement.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
            },
        });

        revalidatePath('/dashboard/announcements');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to update announcement:', error);
        return { success: false, error: 'Failed to update announcement' };
    }
}; 