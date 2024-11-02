import userDb from '../repository/user.db';
import { UserInput } from '../model/user';

const getAllUsers = async () => {
    return await userDb.getAllUsers();
}

const createUser = async (user: UserInput) => {
    return await userDb.createUser(user);
}

export default {
    getAllUsers,
    createUser,
}