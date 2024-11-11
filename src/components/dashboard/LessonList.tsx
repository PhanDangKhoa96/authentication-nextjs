'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import AddNewRecord from './AddNewRecord';
import DeleteDialog from './DeleteDialog';
import { deleteLesson } from '../../../data/lesson';
import { LessonWithRelations } from '@/types/users';

const LessonList = ({ lessons }: { lessons: LessonWithRelations[] }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Day</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {lessons.map((lesson, index) => (
                        <TableRow key={lesson.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <TableCell>{lesson.name}</TableCell>
                            <TableCell>{lesson.day}</TableCell>
                            <TableCell>
                                {format(lesson.startTime, 'HH:mm')} - {format(lesson.endTime, 'HH:mm')}
                            </TableCell>
                            <TableCell>{lesson.subject.name}</TableCell>
                            <TableCell>{lesson.teacher.name}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <AddNewRecord record={lesson} type="update" />
                                    <DeleteDialog
                                        description="This action cannot be undone. This will permanently delete the lesson and remove the data from our servers."
                                        onDelete={() => deleteLesson({ id: lesson.id })}
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

export default LessonList; 