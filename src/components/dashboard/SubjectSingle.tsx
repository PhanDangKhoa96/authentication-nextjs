'use client';

import {TableCell, TableRow} from '@/components/ui/table';
import {Subject} from '@prisma/client';
import {Edit, Trash2} from 'lucide-react';
import {deleteSubject} from '../../../data/subject';
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
import {Button} from '../ui/button';
import AddNewRecord from './AddNewRecord';
import {SubjectWithRelations} from '@/types/users';
import DeleteDialog from './DeleteDialog';

const SubjectSingle = (props: SubjectWithRelations) => {
    const {id, name, teachers} = props || {};

    return (
        <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>
                {teachers?.map((teacher) => teacher.name).join(', ')}
            </TableCell>
            <TableCell>Subject Lessons</TableCell>

            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <AddNewRecord record={props} type="update" />
                    <DeleteDialog 
                        description="This action cannot be undone. This will permanently delete the subject and remove the data from our servers."
                        onDelete={() => deleteSubject({ id })}
                    />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default SubjectSingle;
