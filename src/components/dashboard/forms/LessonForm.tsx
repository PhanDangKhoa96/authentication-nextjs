'use client';

import { Dispatch, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonFormSchema } from '@/schemas/formSchema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Day } from '@prisma/client';
import { createLesson, updateLesson } from '../../../../data/lesson';
import { useToast } from '@/hooks/use-toast';
import { getAllSubjects } from '../../../../data/subject';
import { getAllTeachers } from '../../../../data/teacher';
import { format } from 'date-fns';
import { LessonWithRelations } from '@/types/users';

export default function LessonForm({
    setIsOpen,
    isAddForm,
    record,
}: {
    setIsOpen: Dispatch<boolean>;
    isAddForm: boolean;
    record?: LessonWithRelations;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subjects, setSubjects] = useState<Array<{ id: number; name: string }>>([]);
    const [teachers, setTeachers] = useState<Array<{ id: string; name: string }>>([]);
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(lessonFormSchema),
        defaultValues: {
            name: record?.name ?? "",
            day: record?.day ?? "MONDAY",
            startTime: record?.startTime ? new Date(record.startTime) : new Date(),
            endTime: record?.endTime ? new Date(record.endTime) : new Date(),
            subjectId: record?.subjectId ? Number(record.subjectId) : undefined,
            teacherId: record?.teacherId ?? "",
        },
    });

    useEffect(() => {
        const loadData = async () => {
            const [subjectsData, teachersData] = await Promise.all([
                getAllSubjects(),
                getAllTeachers(),
            ]);
            setSubjects(subjectsData || []);
            setTeachers(teachersData || []);
        };
        loadData();
    }, []);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const result = isAddForm
                ? await createLesson(data)
                : await updateLesson({ ...data, id: record?.id });

            if (result?.error) {
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                });
                return;
            }

            form.reset();
            toast({
                title: 'Success',
                description: isAddForm ? 'New lesson created!' : 'Lesson updated!',
            });
            setIsOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lesson Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter lesson name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Day</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a day" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(Day).map((day) => (
                                        <SelectItem key={day} value={day}>
                                            {day}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <Input
                                        type="time"
                                        {...field}
                                        value={format(field.value, 'HH:mm')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                    <Input
                                        type="time"
                                        {...field}
                                        value={format(field.value, 'HH:mm')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="subjectId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                                value={field.value?.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {subjects.map((subject) => (
                                        <SelectItem key={subject.id} value={subject.id.toString()}>
                                            {subject.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="classId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a class" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {classes.map((class_) => (
                                        <SelectItem key={class_.id} value={class_.id.toString()}>
                                            {class_.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <FormField
                    control={form.control}
                    name="teacherId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teacher</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a teacher" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {teachers.map((teacher) => (
                                        <SelectItem key={teacher.id} value={teacher.id}>
                                            {teacher.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting
                        ? isAddForm ? 'Creating...' : 'Updating...'
                        : isAddForm ? 'Create Lesson' : 'Update Lesson'}
                </Button>
            </form>
        </Form>
    );
}
