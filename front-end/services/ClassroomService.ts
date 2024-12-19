const getAllClassrooms = async () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/classrooms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

}

export const ClassroomService = {
    getAllClassrooms,
};