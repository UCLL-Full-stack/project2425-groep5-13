export type User = {
    email?: string[];
    studentNumber: string;
    password?: string;
    role?: string;
};

export type StatusMessage = {
    message: string;
    type: 'error' | 'success';
};
