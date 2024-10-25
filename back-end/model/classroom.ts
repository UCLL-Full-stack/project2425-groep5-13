import { Reservation } from "./reservation";

export class Classroom{
    readonly id?: number;
    readonly campus: string;
    readonly classroomNumber: string;
    readonly reservations: Reservation[]

    constructor(classroom: {id?: number; campus: string; classroomNumber: string}){
        this.validate(classroom);

        this.id = classroom.id;
        this.campus = classroom.campus;
        this.classroomNumber = classroom.classroomNumber;
        this.reservations = [];
    }

    validate(classroom: {campus: string, classroomNumber: string}){
        if(!classroom.campus){
            throw new Error('Campus is required')
        }
        if(!classroom.classroomNumber){
            throw new Error('Classroom number is required')
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getCampus(): string{
        return this.campus;
    }

    getClassroomNumber(): string{
        return this.classroomNumber;
    }

    getReservations(): Reservation[] {
        return this.reservations
    }

    addReservationToClassroom(reservation: Reservation) {
        if (!reservation) throw new Error('Reservation is required');
        for (let i = 0; i < this.getReservations().length; i++) {
            const res1 = this.getReservations()[i];
            if (res1.getTimeSlot().overlapsWith(reservation.getTimeSlot())) {
                throw new Error('Reservation you want to add has overlapping timeslots with another reservation');
            }
        }
        this.reservations.push(reservation);
    }

    equal(classroom: Classroom): boolean{
        return (
            this.id === classroom.getId() &&
            this.campus === classroom.getCampus() &&
            this.classroomNumber === classroom.getClassroomNumber() &&
            this.reservations.every((reservation, index) => reservation.equals(classroom.getReservations()[index]))
        )
    }
}
