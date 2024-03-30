'use client';

import {loginSchema, forgotSchema, resetSchema} from '@/schemas';
import {ResetValueType} from '@/types/login';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSearchParams} from 'next/navigation';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {resetPassword} from '../../../actions/resetPassword';
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
import FormStatus from './FormStatus';

const ResetPasswordForm = () => {
    const search = useSearchParams();
    const token = search.get('token');
    const form = useForm<ResetValueType>({
        resolver: zodResolver(resetSchema),
        defaultValues: {},
    });

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: ResetValueType) => {
        if (!token) {
            setError('Token is required!');
            return;
        }
        setError('');
        setSuccess('');
        startTransition(() => {
            resetPassword(token, values.password).then((data) => {
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
            <h1 className="text-2xl font-semibold text-center mb-10">
                Reset Password
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <div className="space-y-6">
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

                        <FormField
                            control={form.control}
                            name="confirmationPassword"
                            disabled={isPending}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirmation Password</FormLabel>
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
                        Reset password
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ResetPasswordForm;
