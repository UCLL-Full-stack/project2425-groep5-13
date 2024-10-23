import { User } from "./user";

export class StudentAssocation{
    readonly id?: number;
    readonly kboNumber: string;
    readonly name: string;
    readonly users: User[];

    constructor(studentAssocation: { id?: number; kboNumber: string; name: string; users: User[]}){
        this.validate(studentAssocation)

        this.kboNumber = studentAssocation.kboNumber
        this.name = studentAssocation.name;
        this.users = studentAssocation.users;
    }

    validate(studentAssocation: {kboNumber: string; name: string; users: User[]}){
        if (!studentAssocation.kboNumber){
            throw new Error('KBO nummer is required')
        }
        if (!studentAssocation.name){
            throw new Error('Name is required')
        }
        if (studentAssocation.users.length === 0){
            throw new Error('Student assocation must have at least 1 user enrolled')
        }
    }

    getId(): number | undefined {
        return this.id
    }

    getKboNummer(): string {
        return this.kboNumber
    }

    getName(): string {
        return this.name
    }

    getUsers(): User[] {
        return this.users
    }

    addUserToStudentAssocation(user: User){
        if (!user) throw new Error('User is required');
        if (this.users.includes(user))
            throw new Error('User is already enrolled in this student assocation')
        this.users.push(user)
    }

    equals(studentAssocation: StudentAssocation): boolean {
        return (
            this.id === studentAssocation.getId() &&
            this.kboNumber === studentAssocation.getKboNummer() &&
            this.name === studentAssocation.getName() &&
            this.users.every((user, index) => user.equals(studentAssocation.getUsers()[index]))
        )
    }
}