import { Reservation } from '../model/reservation';
import reservationDb from '../repository/reservation.db';

const getAllReservations = async (): Promise<Reservation[]> => reservationDb.getAllReservations();

export default {
    getAllReservations,
};
