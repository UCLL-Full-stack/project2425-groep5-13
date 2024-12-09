import { useEffect, useState } from 'react';
import { Reservation, User } from '@/types';
import Head from 'next/head';
import Header from '@/components/header';
import ReservationsOverview from '@/components/reservations/ReservationsOverview';
import ReservationService from '@/services/ReservationService';

const Profile: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    useEffect(() => {
        const getReservationsByUser = async () => {
            setError('');
            if (!loggedInUser) {
                setError('You are not authorized to view this page. Please login first.');
                return;
            }

            const response = await ReservationService.getReservationsByUser(
                loggedInUser.studentNumber
            );

            if (!response.ok) {
                if (response.status === 401) {
                    setError('You are not authorized to view this page. Please login first.');
                } else {
                    setError('Failed to fetch reservations');
                }
            } else {
                const reservations = await response.json();
                setReservations(reservations);
            }
        };
        if (loggedInUser) {
            getReservationsByUser();
        }
    }, [loggedInUser]);

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>My reservations</h1>
                {error && <div className="text-red-800">{error}</div>}
                {reservations && <ReservationsOverview reservations={reservations} />}
            </main>
        </>
    );
};

export default Profile;
