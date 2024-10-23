import { TimeSlot } from "./timeSlot";

export class Reservation{
    private id: number;
    private timeSlot: TimeSlot;

    constructor(reservation: { id: number; timeSlot: TimeSlot;}){
        this.id = reservation.id;
        this.timeSlot = reservation.timeSlot;
    }

    getId(): number{
        return this.id;
    }

    getTimeSlot(): TimeSlot{
        return this.timeSlot;
    }

    equals(reservation: Reservation): boolean{
        return (
            this.id === reservation.id &&
            this.timeSlot === reservation.timeSlot
        )
    }
}