import { StudentAssocation } from "./studentAssocation";

export class User{
    readonly id?: number;
    readonly studentNumber: string;
    readonly email: string;
    readonly password: string;
    readonly studentAssocations: StudentAssocation[]

    constructor(user: {id?: number; studentNumber: string; email: string; password: string; studentAssocations: StudentAssocation[]}){
        this.validate(user);

        this.id = user.id;
        this.studentNumber = user.studentNumber;
        this.email = user.email;
        this.password = user.password;
        this.studentAssocations = user.studentAssocations;
    }

    validate(user: { studentNumber: string; email: string; password: string }){
        if (!user.studentNumber) {
            throw new Error('Studenten nummer is required')
        }
        if (!user.email) {
            throw new Error('Email is required')
        }
        if (!user.password) {
            throw new Error('Password is required')
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getStudentNumber(): string{
        return this.studentNumber;
    }

    getEmail(): string{
        return this.email;
    }

    getPassword(): string{
        return this.password;
    }

    getStudentAssocations(): StudentAssocation[] {
        return this.studentAssocations;
    }

    addStudentAssocationToUser(studentAssocation: StudentAssocation) {
        if (!studentAssocation) throw new Error('Student assocation is required');
        if (this.studentAssocations.includes(studentAssocation))
            throw new Error('Student assocation is already enrolled in this user')
        this.studentAssocations.push(studentAssocation)
    }

    equals(user: User): boolean{
        return (
            this.id === user.getId() &&
            this.studentNumber === user.getStudentNumber() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.studentAssocations.every((studentAssocation, index) => studentAssocation.equals(user.getStudentAssocations()[index]))
        )
    }
}
