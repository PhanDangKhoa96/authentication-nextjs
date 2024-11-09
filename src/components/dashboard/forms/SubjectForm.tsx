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
import {formSchema} from '@/schemas/formSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {Dispatch, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {createSubject, updateSubject} from '../../../../data/subject';
import {Subject} from '@prisma/client';

const SubjectForm = ({
    setIsOpen,
    isAddForm,
    record,
}: {
    setIsOpen: Dispatch<boolean>;
    isAddForm: boolean;
    record?: Subject;
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: record?.name ?? '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            if (isAddForm) {
                await createSubject({name: values.name});
                form.reset();
            }

            record &&
                (await updateSubject({id: record?.id, name: values.name}));
        } catch (error) {
            console.error(
                isAddForm
                    ? 'Failed to create subject:'
                    : 'Failed to update subject:',
                error
            );
        } finally {
            setIsOpen(false);
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
