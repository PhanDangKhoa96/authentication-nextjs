'use client';

import {registerSchema} from '@/schemas';
import {RegisterValueType} from '@/types/login';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {register} from '../../../actions/register';
import {Button} from '../ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import ExternalProvider from './ExternalProvider';
import FormStatus from './FormStatus';

const defaultValues: RegisterValueType = {
    email: '',
    name: '',
    password: '',
};

const RegisterForm = () => {
    const form = useForm<RegisterValueType>({
        resolver: zodResolver(registerSchema),
        defaultValues,
    });

    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{
        error?: string | undefined;
        success?: string | undefined;
    }>({
        error: '',
        success: '',
    });

    const onSubmit = (values: RegisterValueType) => {
        setMessage({error: '', success: ''});
        startTransition(() => {
            register(values)
                .then((data) => {
                    setMessage(data);
                })
                .finally(() => {
                    if (message.success) form.reset(defaultValues);
                });
        });
    };

    return (
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <h1 className="text-2xl font-semibold text-center mb-10">
                Register
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            disabled={isPending}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            disabled={isPending}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            disabled={isPending}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="******"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormStatus
                        message={message?.error || message?.success}
                        isError={Boolean(message?.error)}
                    />

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default RegisterForm;
