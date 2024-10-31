import { Classroom } from "../model/classroom";
import { Reservation } from "../model/reservation";
import { TimeSlot } from "../model/timeSlot";

const reservations = [
    new Reservation({
        id: 1,
        timeSlot: new TimeSlot(
            new Date('2024-05-01T10:00:00'),
            new Date('2024-05-01T12:00:00')
        ),
        classroom: new Classroom({
            id: 1,
            campus: 'Proximus',
            classroomNumber: "C107" 
        })
    }),
    new Reservation({
        id: 2,
        timeSlot: new TimeSlot(
            new Date('2024-05-01T13:00:00'),
            new Date('2024-05-01T15:00:00')
        ),
        classroom: new Classroom({
            id: 1,
            campus: 'Proximus',
            classroomNumber: "C107" 
        })
    }),
]

const getAllReservations = (): Reservation[] => reservations

const getReservationById = ({ id }: { id: number}): Reservation | null => {
    try {
        return reservations.find((reservation) => reservation.getId() == id) || null
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAllReservations,
    getReservationById
}