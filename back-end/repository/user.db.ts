import { User, UserInput } from '../model/user';

const users = [
    new User({
        id: 1,
        studentNumber: 'r0945831',
        email: 'john.doe@example.com',
        password: 'password123'
    }),
    new User({
        id: 2,
        studentNumber: 'r0945840',
        email: 'jane.smith@example.com',
        password: 'password456'
    })
]

const getAllUsers = async (): Promise<User[]> => { return users; }

const getUserById = async ({ id }: { id: number}): Promise<User | null> => {
    try {
        return users.find((user) => user.getId() == id) || null
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

const createUser = async (user: UserInput): Promise<User> => {
    // @ts-ignore
    const id = [...users].sort((a, b) => b.id - a.id)[0].id+1;
    user.id = id;
    const newUser = new User(user);
    users.push(newUser);
    return newUser;
}

export default {
    getAllUsers,
    getUserById,
    createUser,
}