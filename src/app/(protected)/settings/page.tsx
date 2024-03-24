import {Button} from '@/components/ui/button';
import React from 'react';
import {auth, signOut} from '../../../../auth';

const SettingPage = async () => {
    const session = await auth();
    return (
        <div>
            {JSON.stringify(session)}

            <form
                action={async () => {
                    'use server';

                    await signOut();
                }}>
                <Button type="submit">Sign Out</Button>
            </form>
        </div>
    );
};

export default SettingPage;
