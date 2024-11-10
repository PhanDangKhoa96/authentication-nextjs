'use client';

import { Dispatch, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { teacherSchema } from '@/schemas/userSchema';
import { BloodType, UserSex } from '@prisma/client';
import { SubjectSelect } from './SubjectSelect';
import { createTeacher } from '../../../../data/teacher';
import { TeacherWithRelations } from '@/types/users';
import { useToast } from '@/hooks/use-toast';

type TeacherFormValues = z.infer<typeof teacherSchema>;

export default function TeacherForm({
    setIsOpen,
    isAddForm,
    record,
}: {
    setIsOpen: Dispatch<boolean>;
    isAddForm: boolean;
    record?: TeacherWithRelations;
}) {
    const [date, setDate] = useState<Date | undefined>(record?.birthday || undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const methods = useForm<TeacherFormValues>({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            name: record?.name,
            email: record?.email,
            phone: record?.phone ?? undefined,
            image: record?.image ?? undefined,
            bloodType: record?.bloodType ?? undefined,
            sex: record?.sex ?? undefined,
            birthday: record?.birthday ?? undefined,
            subjects: record?.subjects?.map(subject => ({ id: subject.id, name: subject.name })) ?? [],
            password: record?.password ?? undefined,
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = methods;

    const onSubmit = async (data: TeacherFormValues) => {
        setIsSubmitting(true);
        try {
            const result = await createTeacher(data as TeacherWithRelations);
            if (result?.error) {
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                });

                return;
            }

            methods.reset();

            toast({
                title: 'Success',
                description: 'New teacher created!',
                variant: 'default',
            });
            setIsOpen(false);
        } catch (error) {
            setIsOpen(false);

            throw new Error('Failed to create teacher');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid-cols-2 grid gap-x-6">
                    <div className="space-y-4">


                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                disabled={!isAddForm}
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" {...register('name')} />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone (Optional)</Label>
                            <Input id="phone" {...register('phone')} />
                            {errors.phone && (
                                <p className="text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="image">
                                Profile Image URL (Optional)
                            </Label>
                            <Input id="image" {...register('image')} />
                            {errors.image && (
                                <p className="text-sm text-red-500">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="bloodType">Blood Type</Label>
                            <Select
                                onValueChange={(value) =>
                                    setValue(
                                        'bloodType',
                                        value as TeacherFormValues['bloodType']
                                    )
                                }>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select blood type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(BloodType).map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.bloodType && (
                                <p className="text-sm text-red-500">
                                    {errors.bloodType.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Subjects</Label>
                            <SubjectSelect />
                            {errors.subjects && (
                                <p className="text-sm text-red-500">
                                    {errors.subjects.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Sex</Label>
                            <RadioGroup
                                onValueChange={(value) =>
                                    setValue(
                                        'sex',
                                        value as TeacherFormValues['sex']
                                    )
                                }>
                                {Object.values(UserSex).map((sex) => {
                                    return (
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={sex}
                                                id={sex.toLowerCase()}
                                            />
                                            <Label
                                                className="capitalize"
                                                htmlFor={sex.toLowerCase()}>
                                                {sex.toLowerCase()}
                                            </Label>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                            {errors.sex && (
                                <p className="text-sm text-red-500">
                                    {errors.sex.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Date of Birth</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-full justify-start text-left font-normal',
                                            !date && 'text-muted-foreground'
                                        )}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                            format(date, 'PPP')
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(newDate) => {
                                            setDate(newDate);
                                            setValue(
                                                'birthday',
                                                newDate as Date
                                            );
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.birthday && (
                                <p className="text-sm text-red-500">
                                    {errors.birthday.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? isAddForm
                            ? 'Creating...'
                            : 'Updating...'
                        : isAddForm
                            ? 'Create Teacher'
                            : 'Update Teacher'}
                </Button>
            </form>
        </FormProvider>
    );
}
