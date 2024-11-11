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
    password: string
}

type StudentAssociationInput = {
    id?: number
    kboNumber: number
    name: string
    users: UserInput[]
}

export {
    ClassroomInput,
    ReservationInput,
    UserInput,
    StudentAssociationInput
}