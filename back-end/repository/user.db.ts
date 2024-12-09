import { User } from "../model/user";
import database from "../util/database";
import { UserInput } from "../types";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    };
};

const getUserByStudentNumber = async (userStudentNumber: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { studentNumber: userStudentNumber }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async ({ studentNumber, email, password, role }: UserInput): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                studentNumber,
                email,
                password,
                role
            }
        });
        return User.from(userPrisma)
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    getUserByStudentNumber,
    createUser
}