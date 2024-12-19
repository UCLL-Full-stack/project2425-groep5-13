import { useEffect, useState } from 'react';
import { Reservation, User } from '@/types';
import { ReservationService } from '@/services/ReservationService';
import ReservationsOverview from '@/components/reservations/ReservationsOverview';
import Header from '@/components/header';
import ReservationForm from '@/components/reservations/ReservationForm';

const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
            console.log(user);
        } else {
            console.log('ops');
            return;
        }
    }, []);

    useEffect(() => {
        const getReservationsByUser = async () => {
            if (!loggedInUser) {
                return;
            }

            const response = await ReservationService.getAllReservations(
                loggedInUser.studentNumber
            );

            if (!response.ok) {
                console.log(response);
            } else {
                const reservations = await response.json();
                setReservations(reservations);
            }
        };
        if (loggedInUser) {
            getReservationsByUser();
        }
    }, [loggedInUser]);

    const deleteReservation = async (reservationId: number) => {
        await ReservationService.deleteReservation(reservationId);
        setReservations(
            (reservations || []).filter((reservation) => reservation.id !== reservationId)
        );
    };

    const addReservation = (reservation: Reservation) => {
        setReservations([...(reservations || []), reservation]);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                {loggedInUser ? (
                    <div className="flex flex-col">
                        <ReservationsOverview
                            reservations={reservations as Reservation[]}
                            loggedInUser={loggedInUser}
                            deleteReservation={deleteReservation}
                        />
                        <ReservationForm onSuccess={addReservation} />
                    </div>
                ) : (
                    <p>You are not logged in</p>
                )}
            </div>
        </>
    );
};

export default Reservations;
