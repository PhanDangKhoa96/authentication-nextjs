import {db} from '@/lib/db';
import {UserRole} from '@prisma/client';
import bcrypt from 'bcryptjs';

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({where: {email}});

        return user;
    } catch (error) {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({where: {id}});

        return user;
    } catch (error) {
        return null;
    }
};

export const createNewUser = async ({
    email,
    name,
    password,
    role,
}: {
    email: string;
    name: string;
    password: string;
    role: UserRole;
}) => {
    const harshedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
        data: {email, name, password: harshedPassword, role},
    });

    return user;
};
