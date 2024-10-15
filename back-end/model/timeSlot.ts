export class TimeSlot {
    readonly startTime: Date;
    readonly endTime: Date;

    constructor(startTime: Date, endTime: Date) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    overlapsWith(other: TimeSlot): boolean {
        return this.startTime < other.endTime && this.endTime > other.startTime;
    }

    getDurationInMinutes(): number {
        return (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60);
    }
}