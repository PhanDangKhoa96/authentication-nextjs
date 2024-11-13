'use client'

import { Dispatch, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { announcementSchema } from "@/schemas/formSchema"
import { useToast } from "@/hooks/use-toast"
import { createAnnouncement, updateAnnouncement } from "../../../../data/announcement"

type AnnouncementFormValues = z.infer<typeof announcementSchema>

interface AnnouncementFormProps {
    setIsOpen: Dispatch<boolean>;
    isAddForm: boolean;
    record?: any;
}

export function AnnouncementForm({
    setIsOpen,
    isAddForm,
    record,
}: AnnouncementFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<AnnouncementFormValues>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            title: record?.title ?? "",
            description: record?.description ?? "",
            date: record?.date ? new Date(record.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        },
    })

    const onSubmit = async (data: AnnouncementFormValues) => {
        setIsSubmitting(true);
        try {
            const announcementData = {
                ...data,
                date: new Date(data.date),
            };
            
            const result = isAddForm
                ? await createAnnouncement(announcementData)
                : record?.id
                    ? await updateAnnouncement({ ...announcementData, id: record.id })
                    : { success: false, error: 'No record ID found for update' };

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
                description: isAddForm ? 'New announcement created!' : 'Announcement updated!',
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter announcement title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter announcement description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting
                        ? isAddForm ? 'Creating...' : 'Updating...'
                        : isAddForm ? 'Create Announcement' : 'Update Announcement'}
                </Button>
            </form>
        </Form>
    )
} 