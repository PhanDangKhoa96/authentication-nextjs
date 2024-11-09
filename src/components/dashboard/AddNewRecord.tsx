'use client';

import TeacherForm from '@/components/dashboard/forms/TeacherForm';
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Edit, Plus} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import SubjectForm from './forms/SubjectForm';
import {Subject} from '@prisma/client';

const AddNewRecord = ({
    type,
    record,
}: {
    type: 'add' | 'update';
    record: Subject;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const pageName = pathname.split('/').reverse()[0];

    const isAddForm = type === 'add';

    const pageContent = () => {
        switch (pageName) {
            case 'teachers':
                return {
                    buttonText: 'Add Teacher',
                    dialogTitle: isAddForm
                        ? 'Add New Teacher'
                        : 'Update Teacher',
                    form: TeacherForm,
                };
            // case 'students':
            //     return 'Add Student';
            // case 'classes':
            //     return 'Add Class';
            case 'subjects':
                return {
                    buttonText: 'Add Subject',
                    dialogTitle: isAddForm
                        ? 'Add New Subject'
                        : 'Update Subject',
                    form: SubjectForm,
                };
            default:
                return {
                    buttonText: 'Add Subject',
                    dialogTitle: 'Add New Subject',
                    form: TeacherForm,
                };
        }
    };

    const FormComponent = pageContent().form;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {isAddForm ? (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        {pageContent().buttonText}
                    </Button>
                ) : (
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{pageContent().dialogTitle}</DialogTitle>
                </DialogHeader>
                <FormComponent
                    record={record}
                    isAddForm={isAddForm}
                    setIsOpen={setIsOpen}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AddNewRecord;
