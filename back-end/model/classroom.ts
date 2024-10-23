import { Reservation } from "./reservation";

export class Classroom{
    readonly id?: number;
    readonly campus: string;
    readonly classroomNumber: string;
    readonly reservation: Reservation[]

    constructor(classroom: {id?: number; campus: string; classroomNumber: string; reservations: Reservation[]}){
        this.validate(classroom);

        this.id = classroom.id;
        this.campus = classroom.campus;
        this.classroomNumber = classroom.classroomNumber;
        this.reservation = classroom.reservations;
    }

    validate(classroom: {campus: string, classroomNumber: string, reservations: Reservation[] }){
        if(!classroom.campus){
            throw new Error('Campus is required')
        }
        if(!classroom.classroomNumber){
            throw new Error('Classroom ')
        }
        for (let i = 0; i < classroom.reservations.length; i++) {
            for (let j = i + 1; j < classroom.reservations.length; j++) {
                const res1 = classroom.reservations[i];
                const res2 = classroom.reservations[j];
                if (res1.getTimeSlot().overlapsWith(res2.getTimeSlot())) {
                    throw new Error('Reservations have overlapping timeslots');
                }
            }
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

    getReservation(): Reservation[] {
        return this.reservation
    }

    equal(classroom: Classroom): boolean{
        return (
            this.id === classroom.getId() &&
            this.campus === classroom.getCampus() &&
            this.classroomNumber === classroom.getClassroomNumber() &&
            this.reservation.every((reservation, index) => reservation.equals(classroom.getReservation()[index]))
        )
    }
}
