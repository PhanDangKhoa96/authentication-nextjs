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
} from '../ui/alert-dialog';
import {deleteSubject} from '../../../data/subject';
import SubjectSingle from './SubjectSingle';

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
                    <SubjectSingle key={subject.id} {...subject} />
                ))}
            </TableBody>
        </Table>
    );
};

export default SubjectList;
