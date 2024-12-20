import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { Reservation, User } from '@/types';
import { useTranslation } from 'next-i18next';
import ReservationForm from '@/components/reservations/ReservationForm';
import Header from '@/components/header';
import withAuth from '@/util/withAuth';

const addReservation: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();
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

    return (
        <>
            <Header />
            <ReservationForm />
        </>
    );

};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common']))
        }
    };
};

export default withAuth(addReservation);
