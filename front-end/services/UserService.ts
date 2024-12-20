import { User } from "@/types";

const createUser = async (formData: { studentNumber: string, email: string, password: string, role: string }) => {
    formData.role = "student";
    // @ts-ignore
    formData.email = [formData.email];
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users",
        {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
}

const getAllUsers = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
}

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const updateUser = async (user: User) => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${user.id}`,
        {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
}

const UserService = {
    createUser,
    loginUser,
    getAllUsers,
    updateUser
}



export default UserService;