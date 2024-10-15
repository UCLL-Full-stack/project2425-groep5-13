import { TimeSlot } from "./timeSlot";

export class Reservatie{
    private id: number;
    private timeSlot: TimeSlot;

    constructor(reservatie: { id: number; timeSlot: TimeSlot;}){
        this.id = reservatie.id;
        this.timeSlot = reservatie.timeSlot;
    }

    getId(): number{
        return this.id;
    }

    getTimeSlot(): TimeSlot{
        return this.timeSlot;
    }

    equals(reservatie: Reservatie): boolean{
        return (
            this.id === reservatie.id &&
            this.timeSlot === reservatie.timeSlot
        )
    }
}