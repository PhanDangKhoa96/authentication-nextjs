'use client';

import {Calendar} from '@/components/ui/calendar';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const EventSection = () => {
    return (
        <div className="w-80 space-y-6 border-l border-gray-200 bg-gray-50 p-4">
            <Card className="border-2 border-black">
                <CardContent className="p-0">
                    <Calendar mode="single" className="w-full" />
                </CardContent>
            </Card>
            <Card className="border-2 border-black">
                <CardHeader>
                    <CardTitle>Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        {
                            title: 'Book Fair',
                            description:
                                'Browse and purchase books at our annual school Book Fair.',
                        },
                        {
                            title: 'Sports Day',
                            description:
                                'A fun-filled day of athletic events and team competitions.',
                        },
                        {
                            title: 'Art Exhibition',
                            description:
                                'Display your artwork for the school community to admire.',
                        },
                    ].map(({title, description}) => (
                        <div key={title}>
                            <h4 className="font-semibold">{title}</h4>
                            <p className="text-sm text-gray-500">
                                {description}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="border-2 border-black">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Announcements</CardTitle>
                        <span className="text-xs text-gray-500">View All</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold">
                                    Picture Day Reminder
                                </h4>
                                <span className="text-xs text-gray-500">
                                    14/09/2024
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">
                                School Picture Day is tomorrow! Don't forget to
                                wear your full uniform and bring your best
                                smile.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EventSection;
