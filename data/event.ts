'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type Event = {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
}

export const createEvent = async (data: Omit<Event, 'id'>) => {
    try {
        await db.event.create({
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
            },
        });

        revalidatePath('/dashboard/events');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to create event:', error);
        return { success: false, error: 'Failed to create event' };
    }
};

export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const events = await db.event.findMany({
            orderBy: {
                startTime: 'asc',
            },
        });
        return events;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw new Error('Failed to fetch events');
    }
};

export const deleteEvent = async ({ id }: { id: number }) => {
    try {
        await db.event.delete({
            where: { id },
        });
        revalidatePath('/dashboard/events');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to delete event:', error);
        return { success: false, error: 'Failed to delete event' };
    }
};

export const updateEvent = async (data: Event) => {
    try {
        await db.event.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
            },
        });

        revalidatePath('/dashboard/events');
        return { success: true, error: null };
    } catch (error) {
        console.error('Failed to update event:', error);
        return { success: false, error: 'Failed to update event' };
    }
}; 