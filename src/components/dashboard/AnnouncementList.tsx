'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddNewRecord from './AddNewRecord';
import DeleteDialog from './DeleteDialog';
import { deleteAnnouncement } from '../../../data/announcement';
import { AnnouncementWithRelations } from '@/types/users';

const AnnouncementList = ({ announcements }: { announcements: AnnouncementWithRelations[] }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="">

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAnnouncements.map((announcement, index) => (
                            <TableRow key={announcement.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <TableCell className="font-medium">{announcement.title}</TableCell>
                                <TableCell>{announcement.description}</TableCell>
                                <TableCell>{format(announcement.date, "PPpp")}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <AddNewRecord record={announcement} type="update" />
                                        <DeleteDialog
                                            description="This action cannot be undone. This will permanently delete the announcement and remove the data from our servers."
                                            onDelete={() => deleteAnnouncement({ id: announcement.id })}
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

export default AnnouncementList; 