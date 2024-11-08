import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Edit, Trash2} from 'lucide-react';
import {Button} from '../ui/button';
import {Subject} from '@prisma/client';
import {use} from 'react';

const SubjectList = ({
    getSubjectsPromise,
}: {
    getSubjectsPromise: () => Promise<Subject[] | null>;
}) => {
    const subjects = use(getSubjectsPromise());

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Teachers</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subjects?.map((subject) => (
                    <TableRow key={subject.id}>
                        <TableCell className="font-medium">
                            {subject.name}
                        </TableCell>
                        <TableCell>Teacher names</TableCell>
                        <TableCell>Subject Lessons</TableCell>

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
    );
};

export default SubjectList;
