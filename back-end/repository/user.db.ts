import { User } from "../model/user";

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

const getAllUsers = (): User[] => users;

const getUserById = ({ id }: { id: number}): User | null => {
    try {
        return users.find((user) => user.getId() == id) || null
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAllUsers,
    getUserById
}