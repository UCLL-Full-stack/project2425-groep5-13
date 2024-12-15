import { Reservation } from '../model/reservation';
import database from '../util/database';

const getAllReservations = async (): Promise<Reservation[]> => {
    try {
        const reservationPrisma = await database.reservation.findMany({
            include: {
                classroom: true,
                user: true,
            },
        });
        return reservationPrisma.map((reservationPrisma) => Reservation.from(reservationPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getReservationsByUser = async (studentNumber: string): Promise<Reservation[]> => {
    try {
        const reservationPrisma = await database.reservation.findMany({
            where: {
                user: {
                    studentNumber: studentNumber,
                },
            },
            include: {
                classroom: true,
                user: true,
            },
        });
        return reservationPrisma.map((reservationPrisma) => Reservation.from(reservationPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllReservations,
    getReservationsByUser
};
