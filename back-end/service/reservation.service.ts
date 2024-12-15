import { Reservation } from '../model/reservation';
import reservationDb from '../repository/reservation.db';

const getAllReservations = async (): Promise<Reservation[]> => reservationDb.getAllReservations();

const getReservationsByUser = async (studentNumber: string): Promise<Reservation[]> => {
    return reservationDb.getReservationsByUser(studentNumber);
};

export default {
    getAllReservations,
    getReservationsByUser,
};
