'use client';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {format} from 'date-fns';
import {Edit, Trash2} from 'lucide-react';

// Mock data
const teachers = [
    {
        id: 'T001',
        username: 'jsmith',
        name: 'John',
        surname: 'Smith',
        email: 'john.smith@school.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        img: '/placeholder.svg',
        bloodType: 'A+',
        sex: 'MALE',
        createdAt: new Date('2023-01-15'),
        subjects: ['Math', 'Physics'],
        birthday: new Date('1980-05-10'),
    },
    {
        id: 'T002',
        username: 'mjohnson',
        name: 'Mary',
        surname: 'Johnson',
        email: 'mary.johnson@school.com',
        phone: '987-654-3210',
        address: '456 Oak St, Another Town, USA',
        img: '/placeholder.svg',
        bloodType: 'B-',
        sex: 'FEMALE',
        createdAt: new Date('2023-02-20'),
        subjects: ['English', 'Literature'],
        birthday: new Date('1985-08-22'),
    },
    // Add more mock data as needed
];

const TeacherList = () => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers.map((teacher, index) => (
                        <TableRow
                            key={teacher.id}
                            className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <TableCell>{teacher.id}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={teacher.img}
                                            alt={`${teacher.name} ${teacher.surname}`}
                                        />
                                        <AvatarFallback>
                                            {teacher.name[0]}
                                            {teacher.surname[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    {teacher.name} {teacher.surname}
                                </div>
                            </TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.phone}</TableCell>
                            <TableCell>{teacher.subjects.join(', ')}</TableCell>
                            <TableCell>
                                {format(teacher.createdAt, 'dd/MM/yyyy')}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
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
