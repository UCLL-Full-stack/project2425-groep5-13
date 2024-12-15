import { StudentAssociation as StudentAssociationPrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';

export class StudentAssociation {
    readonly id?: number;
    readonly kboNumber: string;
    readonly name: string;
    readonly users: User[];

    constructor(studentAssociation: {
        id?: number;
        kboNumber: string;
        name: string;
        users: User[];
    }) {
        this.validate(studentAssociation);

        this.id = studentAssociation.id;
        this.kboNumber = studentAssociation.kboNumber;
        this.name = studentAssociation.name;
        this.users = studentAssociation.users;
    }

    validate(studentAssociation: { kboNumber: string; name: string; users: User[] }) {
        if (!studentAssociation.kboNumber) {
            throw new Error('KBO nummer is required');
        }
        if (!studentAssociation.name) {
            throw new Error('Name is required');
        }
        if (studentAssociation.users.length === 0) {
            throw new Error('Student assocation must have at least 1 user enrolled');
        }
    }

    static from({
        id,
        kboNumber,
        name,
        users,
    }: StudentAssociationPrisma & { users: UserPrisma[] }) {
        return new StudentAssociation({
            id,
            kboNumber,
            name,
            users: users.map((user) => User.from(user)),
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getKboNummer(): string {
        return this.kboNumber;
    }

    getName(): string {
        return this.name;
    }

    getUsers(): User[] {
        return this.users;
    }

    addUserTostudentAssociation(user: User) {
        if (!user) throw new Error('User is required');
        if (this.users.includes(user))
            throw new Error('User is already enrolled for this student assocation');
        this.users.push(user);
        return user;
    }

    equals(studentAssociation: StudentAssociation): boolean {
        return (
            this.id === studentAssociation.getId() &&
            this.kboNumber === studentAssociation.getKboNummer() &&
            this.name === studentAssociation.getName() &&
            this.users.every((user, index) => user.equals(studentAssociation.getUsers()[index]))
        );
    }
}
