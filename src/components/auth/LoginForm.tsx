'use client';

import React, {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {Button} from '../ui/button';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import {loginSchema} from '@/schemas';
import {z} from 'zod';
import {login} from '../../../actions/login';
import {LoginValueType} from '@/types/login';
import FormStatus from './FormStatus';
import ExternalProvider from './ExternalProvider';

const LoginForm = () => {
    const form = useForm<LoginValueType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {},
    });

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [isPending, startTransition] = useTransition();
    // const [message, setMessage] = useState<{
    //     error?: string | undefined;
    //     success?: string | undefined;
    // }>({
    //     error: '',
    //     success: '',
    // });

    const onSubmit = (values: LoginValueType) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            login(values).then((data) => {
                if (data?.error) {
                    setError(data.error);
                }

                if (data?.success) {
                    setSuccess(data.success);
                }
            });
        });
    };

    return (
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <h1 className="text-2xl font-semibold text-center mb-10">Login</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <div className="space-y-6">
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
                        message={error || success}
                        isError={Boolean(error)}
                    />

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>

            <ExternalProvider />
        </div>
    );
};

export default LoginForm;
