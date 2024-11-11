import { Suspense } from 'react';
import { getAllEvents } from '../../../../../../data/event';
import EventList from '@/components/dashboard/EventList';

const EventPage = async () => {
    const events = await getAllEvents();
    return (
        <Suspense fallback={<div>Loading events...</div>}>
            <EventList events={events} />
        </Suspense>
    );
};

export default EventPage;