'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TeacherWithRelations } from '@/types/users';
import { Edit, Trash2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import AddNewRecord from './AddNewRecord';
import { deleteTeacher } from '../../../data/teacher';
import DeleteDialog from './DeleteDialog';

const TeacherList = ({ teachers }: { teachers: TeacherWithRelations[] }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers.map((teacher, index) => (
                        <TableRow
                            key={teacher.id}
                            className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={teacher.image || undefined}
                                            alt={`${teacher.name}`}
                                        />
                                        <AvatarFallback>
                                            {teacher.name[0]}

                                        </AvatarFallback>
                                    </Avatar>
                                    {teacher.name}
                                </div>
                            </TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.phone}</TableCell>
                            <TableCell>{teacher.subjects.map(subject => subject.name).join(', ')}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <AddNewRecord record={teacher} type="update" />
                                    <DeleteDialog
                                        description="This action cannot be undone. This will permanently delete the teacher and remove the data from our servers."
                                        onDelete={() => deleteTeacher({ id: teacher.id })}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TeacherList;
