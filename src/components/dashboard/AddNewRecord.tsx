'use client';

import TeacherForm from '@/components/dashboard/forms/TeacherForm';
import SubjectForm from './forms/SubjectForm';
import LessonForm from './forms/LessonForm';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SubjectWithRelations, TeacherWithRelations, LessonWithRelations, EventWithRelations } from '@/types/users';
import { EventForm } from './forms/EventForm';
import { AnnouncementForm } from './forms/AnnouncementForm';
import { AnnouncementWithRelations } from '@/types/users';

type RecordType = SubjectWithRelations | TeacherWithRelations | LessonWithRelations | EventWithRelations | AnnouncementWithRelations;

const AddNewRecord = ({
    type,
    record,
}: {
    type: 'add' | 'update';
    record?: RecordType;
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
            case 'subjects':
                return {
                    buttonText: 'Add Subject',
                    dialogTitle: isAddForm
                        ? 'Add New Subject'
                        : 'Update Subject',
                    form: SubjectForm,
                };
            case 'lessons':
                return {
                    buttonText: 'Add Lesson',
                    dialogTitle: isAddForm
                        ? 'Add New Lesson'
                        : 'Update Lesson',
                    form: LessonForm,
                };
            case 'events':
                return {
                    buttonText: 'Add Event',
                    dialogTitle: isAddForm
                        ? 'Add New Event'
                        : 'Update Event',
                    form: EventForm,
                };
            case 'announcements':
                return {
                    buttonText: 'Add Announcement',
                    dialogTitle: isAddForm
                        ? 'Add New Announcement'
                        : 'Update Announcement',
                    form: AnnouncementForm,
                };
            default:
                return {
                    buttonText: 'Add Record',
                    dialogTitle: 'Add New Record',
                    form: TeacherForm,
                };
        }
    };

    const FormComponent = pageContent().form as React.ComponentType<{
        record?: RecordType;
        isAddForm: boolean;
        setIsOpen: (value: boolean) => void;
    }>;

    const getTypedRecord = () => {
        if (!record) return undefined;

        switch (pageName) {
            case 'teachers':
                return record as TeacherWithRelations;
            case 'subjects':
                return record as SubjectWithRelations;
            case 'lessons':
                return record as LessonWithRelations;
            case 'events':
                return record as EventWithRelations;
            case 'announcements':
                return record as AnnouncementWithRelations;
            default:
                return undefined;
        }
    };

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
                    record={getTypedRecord()}
                    isAddForm={isAddForm}
                    setIsOpen={setIsOpen}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AddNewRecord;
