import {
    Classroom as ClassroomPrisma,
    User as UserPrisma,
    Reservation as ReservationPrisma,
} from '@prisma/client';
import { Classroom } from './classroom';
import { User } from './user';

export class Reservation {
    readonly id?: number;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly classroom: Classroom;
    readonly user: User;

    constructor(reservation: {
        id?: number;
        startTime: Date;
        endTime: Date;
        classroom: Classroom;
        user: User;
    }) {
        this.validate(reservation);

        this.id = reservation.id;
        this.startTime = reservation.startTime;
        this.endTime = reservation.endTime;
        this.classroom = reservation.classroom;
        this.user = reservation.user;
    }

    validate(reservation: { startTime: Date; endTime: Date; classroom: Classroom }) {
        if (!reservation.classroom) {
            throw new Error('Classroom is required');
        }
        if (reservation.startTime >= reservation.endTime) {
            throw new Error('Start time must be before end time.');
        }
        if (
            reservation.startTime.getMinutes() % 30 !== 0 ||
            reservation.endTime.getMinutes() % 30 !== 0
        ) {
            throw new Error('Time slot must start and end at the hour or half hour.');
        }
    }

    static from({
        id,
        startTime,
        endTime,
        classroom,
        user,
    }: ReservationPrisma & { classroom: ClassroomPrisma; user: UserPrisma }) {
        return new Reservation({
            id,
            startTime,
            endTime,
            classroom: Classroom.from(classroom),
            user: User.from(user),
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getStartTime(): Date {
        return this.startTime;
    }

    getEndTime(): Date {
        return this.endTime;
    }

    getClassroom(): Classroom {
        return this.classroom;
    }

    getUser(): User {
        return this.user;
    }

    overlapsWith(reservation: Reservation): boolean {
        return this.startTime < reservation.endTime && this.endTime > reservation.startTime;
    }

    equals(reservation: Reservation): boolean {
        return (
            this.startTime === reservation.getStartTime() &&
            this.endTime === reservation.getEndTime() &&
            this.classroom === reservation.getClassroom() &&
            this.user === reservation.getUser()
        );
    }
}
