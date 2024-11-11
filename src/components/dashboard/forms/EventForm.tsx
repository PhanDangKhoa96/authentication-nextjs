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
import { eventSchema } from "@/schemas/formSchema"
import { useToast } from "@/hooks/use-toast"
import { createEvent, updateEvent } from "../../../../data/event" // You'll need to create these functions
import { EventWithRelations } from "@/types/users"

type EventFormValues = z.infer<typeof eventSchema>

interface EventFormProps {
    setIsOpen: Dispatch<boolean>;
    isAddForm: boolean;
    record?: EventWithRelations;
}

export function EventForm({
    setIsOpen,
    isAddForm,
    record,
}: EventFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: record?.title ?? "",
            description: record?.description ?? "",
            startTime: record?.startTime ? new Date(record.startTime).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
            endTime: record?.endTime ? new Date(record.endTime).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        },
    })

    const onSubmit = async (data: EventFormValues) => {
        setIsSubmitting(true);
        try {
            const eventData = {
                ...data,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
            };
            
            const result = isAddForm
                ? await createEvent(eventData)
                : record?.id
                    ? await updateEvent({ ...eventData, id: record.id })
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
                description: isAddForm ? 'New event created!' : 'Event updated!',
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
                                <Input placeholder="Enter event title" {...field} />
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
                                    placeholder="Enter event description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
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
                                    <Input type="datetime-local" {...field} />
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
                                    <Input type="datetime-local" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting
                        ? isAddForm ? 'Creating...' : 'Updating...'
                        : isAddForm ? 'Create Event' : 'Update Event'}
                </Button>
            </form>
        </Form>
    )
}