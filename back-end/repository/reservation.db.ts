import { Reservation } from '../model/reservation';
import database from '../util/database';
import { ReservationInput } from '../types';

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
        throw new Error('Error getting all reservations.');
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
        throw new Error(`Error getting reservations by student number ${studentNumber}.`);
    }
};

const getReservation = async (reservationId: number): Promise<Reservation> => {
    try {
        console.log(reservationId);
        const reservationPrisma = await database.reservation.findMany({
            where: {
                id: reservationId,
            },
            include: {
                classroom: true,
                user: true
            }
        });
        console.log(reservationPrisma);
        if (!reservationPrisma || reservationPrisma.length === 0) {
            return null;
        }
        return Reservation.from(reservationPrisma[0]);
    } catch (error) {
        console.error(error);
        throw new Error(`Error getting reservation with id ${reservationId}.`);
    }
}

const deleteReservation = async (reservationId: number): Promise<void> => {
    try {
        await database.reservation.delete({
            where: {
                id: reservationId,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Error deleting reservation with id ${reservationId}.`);
    }
}

const createReservation = async (reservationData: ReservationInput): Promise<Reservation> => {
    try {
        const reservationPrisma = await database.reservation.create({
            data: {
                startTime: new Date(reservationData.startTime),
                endTime: new Date(reservationData.endTime),
                classroom: {
                    connect: { id: reservationData.classroom.id },
                },
                user: {
                    connect: { id: reservationData.user.id },
                },
            },
            include: {
                classroom: true,
                user: true,
            },
        });
        return Reservation.from(reservationPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllReservations,
    getReservationsByUser,
    getReservation,
    deleteReservation,
    createReservation,
};
