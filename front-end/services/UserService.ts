import { User } from "@/types";

const createUser = async (formData: { studentNumber: string, email: string, password: string }) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users",
        {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
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

const UserService = {
    createUser,
    loginUser
}



export default UserService;