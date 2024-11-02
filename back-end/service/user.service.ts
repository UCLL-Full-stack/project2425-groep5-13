import userDb from '../repository/user.db';

const getAllUsers = async () => {
    return await userDb.getAllUsers();
}

export default {
    getAllUsers,
}