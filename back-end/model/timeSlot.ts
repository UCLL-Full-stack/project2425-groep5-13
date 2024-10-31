export class TimeSlot {
    readonly startTime: Date;
    readonly endTime: Date;

    constructor(startTime: Date, endTime: Date) {
        this.validate(startTime, endTime);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    validate(startTime: Date, endTime: Date) {
        if (startTime >= endTime) {
            throw new Error("Start time must be before end time.");
        }
        if (startTime.getMinutes() % 30 !== 0 || endTime.getMinutes() % 30 !== 0) {
            throw new Error("Time slot must start and end at the hour or half hour.");
        }
    }

    overlapsWith(other: TimeSlot): boolean {
        return this.startTime < other.endTime && this.endTime > other.startTime;
    }
}