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
import {Plus} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import SubjectForm from './forms/SubjectForm';

const AddNewRecord = () => {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();
    const pageName = pathname.split('/').reverse()[0];

    const pageContent = () => {
        switch (pageName) {
            case 'teachers':
                return {
                    buttonText: 'Add Teacher',
                    dialogTitle: 'Add New Teacher',
                    form: TeacherForm,
                };
            // case 'students':
            //     return 'Add Student';
            // case 'classes':
            //     return 'Add Class';
            case 'subjects':
                return {
                    buttonText: 'Add Subject',
                    dialogTitle: 'Add New Subject',
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
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {pageContent().buttonText}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{pageContent().dialogTitle}</DialogTitle>
                </DialogHeader>
                <FormComponent setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
};

export default AddNewRecord;
