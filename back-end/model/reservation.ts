import { Classroom } from "./classroom";
import { TimeSlot } from "./timeSlot";

export class Reservation{
    readonly id?: number;
    readonly timeSlot: TimeSlot;
    readonly classroom: Classroom;

    constructor(reservation: { id?: number; timeSlot: TimeSlot; classroom: Classroom}){
        this.validate(reservation)

        this.id = reservation.id;
        this.timeSlot = reservation.timeSlot;
        this.classroom = reservation.classroom;
    }

    validate(reservation: {timeSlot: TimeSlot; classroom: Classroom}){
        if (!reservation.timeSlot) {
            throw new Error("TimeSlot is required");
        }
        if (!reservation.classroom) {
            throw new Error("Classroom is required");
        }
    }

    getId(): number | undefined{
        return this.id;
    }

    getTimeSlot(): TimeSlot{
        return this.timeSlot;
    }

    getClassroom(): Classroom{
        return this.classroom
    }

    equals(reservation: Reservation): boolean{
        return (
            this.timeSlot === reservation.getTimeSlot() &&
            this.classroom === reservation.getClassroom()
        )
    }
}