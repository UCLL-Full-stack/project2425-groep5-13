import { Classroom, ClassroomInput } from '@/types';

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

const createClassroom = async ({ campus, classroomNumber }: ClassroomInput) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/classrooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ campus, classroomNumber }),
    });
}

const deleteClassroom = async (classroomId: number) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/classrooms/${classroomId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
}

export const ClassroomService = {
    getAllClassrooms,
    createClassroom,
    deleteClassroom,
};