'use client';

import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {subjectFormSchema} from '@/schemas/formSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {Dispatch, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {createSubject, updateSubject} from '../../../../data/subject';
import {Subject} from '@prisma/client';
import {useToast} from '@/hooks/use-toast';
import { SubjectWithRelations } from '@/types/users';

const SubjectForm = ({
    setIsOpen,
    isAddForm,
    record,
}: {
    setIsOpen: Dispatch<boolean>;
    isAddForm: boolean;
    record?: SubjectWithRelations;
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {toast} = useToast();

    const form = useForm<z.infer<typeof subjectFormSchema>>({
        resolver: zodResolver(subjectFormSchema),
        defaultValues: {
            name: record?.name ?? '',
        },
    });

    async function onSubmit(values: z.infer<typeof subjectFormSchema>) {
        setIsSubmitting(true);
        try {
            if (isAddForm) {
                const result = await createSubject({name: values.name});

                if (result.error) {
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
                    description: 'New subject created!',
                });
            }

            if (record) {
                const result = await updateSubject({
                    id: record?.id,
                    name: values.name,
                });

                if (result.error) {
                    toast({
                        title: 'Error',
                        description: result.error,
                        variant: 'destructive',
                    });
                    return;
                }
                toast({
                    title: 'Success',
                    description: 'Subject updated!',
                });
            }

            setIsOpen(false);
        } catch (error) {
            console.error(
                isAddForm
                    ? 'Failed to create subject:'
                    : 'Failed to update subject:',
                error
            );

            setIsOpen(false);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Subject Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter subject name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? isAddForm
                            ? 'Creating...'
                            : 'Updating...'
                        : isAddForm
                        ? 'Create Subject'
                        : 'Update Subject'}
                </Button>
            </form>
        </Form>
    );
};

export default SubjectForm;
