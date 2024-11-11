import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';


const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers()
}

const createUser = async (user: UserInput) => {
    return userDb.createUser(user);
}

export default {
    getAllUsers,
    createUser,
}