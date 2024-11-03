const createUser = async (formData: {studentNumber: string, email: string, password: string}) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users",
        {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
}

const UserService = {
    createUser,
}

export default UserService;