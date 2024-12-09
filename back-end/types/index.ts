type Role = 'admin' | 'student';

type ClassroomInput = {
    id?: number
    campus: string
    classroomNumber: string
}

type ReservationInput = {
    id?: number;
    startTime: Date
    endTime: Date
    classroom: ClassroomInput
    user: UserInput
}

type UserInput = {
    id?: number
    studentNumber: string,
    email: string[],
    password: string,
    role: Role
}

type StudentAssociationInput = {
    id?: number
    kboNumber: number
    name: string
    users: UserInput[]
}

export {
    Role,
    ClassroomInput,
    ReservationInput,
    UserInput,
    StudentAssociationInput
}