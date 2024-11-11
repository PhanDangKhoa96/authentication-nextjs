'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EventForm } from './forms/EventForm';
import { Event } from '../../../data/event';
import AddNewRecord from './AddNewRecord';
import DeleteDialog from './DeleteDialog';
import { deleteEvent } from '../../../data/event';
import { EventWithRelations } from '@/types/users';

const EventList = ({ events }: { events: EventWithRelations[] }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="">

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEvents.map((event, index) => (
                            <TableRow key={event.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <TableCell className="font-medium">{event.title}</TableCell>
                                <TableCell>{event.description}</TableCell>
                                <TableCell>{format(event.startTime, "PPpp")}</TableCell>
                                <TableCell>{format(event.endTime, "PPpp")}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <AddNewRecord record={event} type="update" />
                                        <DeleteDialog
                                            description="This action cannot be undone. This will permanently delete the event and remove the data from our servers."
                                            onDelete={() => deleteEvent({ id: event.id })}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default EventList; 