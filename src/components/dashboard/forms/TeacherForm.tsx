'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {format} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {cn} from '@/lib/utils';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const teacherSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    surname: z.string().min(2, 'Surname must be at least 2 characters'),
    email: z
        .string()
        .email('Invalid email address')
        .optional()
        .or(z.literal('')),
    phone: z
        .string()
        .regex(/^\+?[0-9]{10,14}$/, 'Invalid phone number')
        .optional()
        .or(z.literal('')),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    img: z.string().url('Invalid image URL').optional().or(z.literal('')),
    bloodType: z.enum(bloodTypes as [string, ...string[]], {
        errorMap: () => ({message: 'Please select a blood type'}),
    }),
    sex: z.enum(['MALE', 'FEMALE', 'OTHER'], {
        errorMap: () => ({message: 'Please select a sex'}),
    }),
    birthday: z.date({
        required_error: 'Please select a date of birth',
    }),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

export default function TeacherForm() {
    const [date, setDate] = useState<Date>();

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        setValue,
    } = useForm<TeacherFormValues>({
        resolver: zodResolver(teacherSchema),
    });

    const onSubmit = (data: TeacherFormValues) => {
        console.log(data);
        // Here you would typically send this data to your API
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid-cols-2 grid gap-x-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" {...register('username')} />
                        {errors.username && (
                            <p className="text-sm text-red-500">
                                {errors.username.message}
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
                        <Label htmlFor="surname">Surname</Label>
                        <Input id="surname" {...register('surname')} />
                        {errors.surname && (
                            <p className="text-sm text-red-500">
                                {errors.surname.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input id="email" type="email" {...register('email')} />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
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
                        <Label htmlFor="img">
                            Profile Image URL (Optional)
                        </Label>
                        <Input id="img" {...register('img')} />
                        {errors.img && (
                            <p className="text-sm text-red-500">
                                {errors.img.message}
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
                                {bloodTypes.map((type) => (
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
                        <Label>Sex</Label>
                        <RadioGroup
                            onValueChange={(value) =>
                                setValue(
                                    'sex',
                                    value as TeacherFormValues['sex']
                                )
                            }>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="MALE" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="FEMALE" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="OTHER" id="other" />
                                <Label htmlFor="other">Other</Label>
                            </div>
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
                                        setValue('birthday', newDate as Date);
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

            <Button type="submit">Create Teacher</Button>
        </form>
    );
}
