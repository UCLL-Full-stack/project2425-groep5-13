import { Reservation } from "./reservation";
import { StudentAssociation } from "./studentAssociation";

export type UserInput = {
    id?: number
    studentNumber: string,
    email: string,
    password: string
}

export class User{
    readonly id?: number;
    readonly studentNumber: string;
    readonly email: string[];
    readonly password: string;
    readonly studentAssociations: StudentAssociation[]
    readonly reservations: Reservation[]

    constructor(user: UserInput){
        this.validate(user);

        this.id = user.id;
        this.studentNumber = user.studentNumber;
        this.email = [user.email];
        this.password = user.password;
        this.studentAssociations = [];
        this.reservations = [];
    }

    validate(user: { studentNumber: string; email: string; password: string}){
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

    getEmail(): string[]{
        return this.email;
    }

    getPassword(): string{
        return this.password;
    }

    getStudentAssociations(): StudentAssociation[] {
        return this.studentAssociations;
    }

    getReservations(): Reservation[] {
        return this.reservations;
    }

    addStudentAssociationToUser(studentAssociation: StudentAssociation) {
        if (!studentAssociation) throw new Error('Student assocation is required');
        if (this.studentAssociations.includes(studentAssociation))
            throw new Error('Student association is already enrolled for this user')
        this.studentAssociations.push(studentAssociation)
    }

    addReservationsToUser(reservation: Reservation) {
        if (!reservation) throw new Error('Reservation is required');
        if (this.reservations.includes(reservation))
            throw new Error('Reservation is already enrolled for this user')
        this.reservations.push(reservation)
    }

    equals(user: User): boolean{
        return (
            this.id === user.getId() &&
            this.studentNumber === user.getStudentNumber() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.studentAssociations.every((studentAssociation, index) => studentAssociation.equals(user.getStudentAssociations()[index])) &&
            this.reservations.every((reservation, index) => reservation.equals(user.getReservations()[index]))
        )
    }
}
