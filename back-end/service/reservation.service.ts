import { Reservation } from '../model/reservation';
import reservationDb from '../repository/reservation.db';
import { ReservationInput } from '../types';


const getAllReservations = async (): Promise<Reservation[]> => reservationDb.getAllReservations();

const getReservationsByUser = async (studentNumber: string): Promise<Reservation[]> => {
    return reservationDb.getReservationsByUser(studentNumber);
};

const getReservation = async (reservationId: number): Promise<Reservation> => {
    try {
        return reservationDb.getReservation(reservationId);
    } catch (e) {
        throw e;
    }
};

const deleteReservation = async (reservationId: number): Promise<void> => {
    try {
        await reservationDb.deleteReservation(reservationId);
    } catch (e) {
        throw e;
    }
}

const createReservation = async (reservationData: ReservationInput): Promise<Reservation> => {
    try {
        const overlappingReservations = await reservationDb.getAllReservations();
        const hasOverlap = overlappingReservations.some((reservation) =>
            reservation.classroom.id === reservationData.classroom.id &&
            reservation.startTime < new Date(reservationData.endTime) &&
            reservation.endTime > new Date(reservationData.startTime)
        );

        if (hasOverlap) {
            throw new Error('The reservation overlaps with an existing reservation.');
        }

        return await reservationDb.createReservation(reservationData);
    } catch (e) {
        throw e;
    }
}

export default {
    getAllReservations,
    getReservationsByUser,
    getReservation,
    deleteReservation,
    createReservation,
};
