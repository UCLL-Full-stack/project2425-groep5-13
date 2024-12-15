import bcrypt from 'bcrypt';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserByStudentNumber = async ({
    studentNumber,
}: {
    studentNumber: string;
}): Promise<User> => {
    const user = await userDb.getUserByStudentNumber(studentNumber);
    if (!user) {
        throw new Error(`User with username: ${studentNumber} does not exist.`);
    }
    return user;
};

const authenticate = async ({
    studentNumber,
    password,
}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByStudentNumber({ studentNumber });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ id: user.id as number, studentNumber, role: user.getRole() }),
        id: user.id as number,
        studentNumber: studentNumber,
        role: user.getRole(),
    };
};

const createUser = async ({ studentNumber, email, password, role }: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByStudentNumber(studentNumber);
    if (existingUser) throw new Error('This user already exists');

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ studentNumber, password: hashedPassword, email, role });

    return await userDb.createUser({ studentNumber, email, password, role });
};

export default {
    getAllUsers,
    getUserByStudentNumber,
    authenticate,
    createUser,
};
