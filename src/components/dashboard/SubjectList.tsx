import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {SubjectWithRelations} from '@/types/users';
import {use} from 'react';
import SubjectSingle from './SubjectSingle';

const SubjectList = ({
    getSubjectsPromise,
}: {
    getSubjectsPromise: () => Promise<SubjectWithRelations[] | null>;
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
