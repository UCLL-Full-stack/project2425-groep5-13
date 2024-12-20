export type User = {
    id: number;
    email: string[];
    studentNumber: string;
    password: string;
    role: string;
};

export type Classroom = {
    id?: number;
    campus: string;
    classroomNumber: string;
};

export type ClassroomInput = {
    campus: string;
    classroomNumber: string;
}

export type StudentAssociation = {
    kboNumber: number;
    name: string;
    users: User[];
};

export type Reservation = {
    id?: number;
    startTime: Date;
    endTime: Date;
    classroom: Classroom;
    user: User;
};

export type StatusMessage = {
    message: string;
    type: 'error' | 'success';
};
