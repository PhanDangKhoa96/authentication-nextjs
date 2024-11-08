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
import {useState} from 'react';

const AddNewRecord = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Teacher
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Teacher</DialogTitle>
                </DialogHeader>
                <TeacherForm />
            </DialogContent>
        </Dialog>
    );
};

export default AddNewRecord;
