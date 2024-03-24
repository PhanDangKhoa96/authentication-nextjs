import {db} from '@/lib/db';
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

export const createNewUser = async (
    email: string,
    name: string,
    password: string
) => {
    const harshedPassword = await bcrypt.hash(password, 10);

    await db.user.create({data: {email, name, password: harshedPassword}});
};
