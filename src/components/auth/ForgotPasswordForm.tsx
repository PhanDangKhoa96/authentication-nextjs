'use client';

import {loginSchema, forgotSchema} from '@/schemas';
import {ForgotValueType} from '@/types/login';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {forgotPasswordAction} from '../../../actions/forgotPassword';
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

const ForgotPasswordForm = () => {
    const form = useForm<ForgotValueType>({
        resolver: zodResolver(forgotSchema),
        defaultValues: {},
    });

    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: ForgotValueType) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            forgotPasswordAction(values).then((data) => {
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
                Forgot Password
            </h1>
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
                    </div>

                    <FormStatus
                        message={error || success}
                        isError={Boolean(error)}
                    />

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full">
                        Send reset password email
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ForgotPasswordForm;
