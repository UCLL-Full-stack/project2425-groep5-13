import { userInfo } from 'os';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';


const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers()
}

const createUser = async ({ studentNumber, email, password }: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByStudentNumber(studentNumber)
    if (existingUser) throw new Error('This user already exists')
    return userDb.createUser({ studentNumber, email, password });
}

export default {
    getAllUsers,
    createUser,
}