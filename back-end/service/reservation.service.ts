import { Reservation } from '../model/reservation';
import reservationDb from '../repository/reservation.db';

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

export default {
    getAllReservations,
    getReservationsByUser,
    getReservation,
    deleteReservation
};
