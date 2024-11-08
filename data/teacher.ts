import {db} from '@/lib/db';
import {createNewUser} from './user';

export const createTeacher = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    try {
        const user = await createNewUser({
            name,
            email,
            password,
            role: 'TEACHER',
        });
        await db.teacher.create({
            data: {
                id: user.id,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });
    } catch (error) {}
};
