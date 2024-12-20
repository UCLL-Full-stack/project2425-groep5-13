import { Reservation, User } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface ReservationsOverviewProps {
    reservations: Reservation[];
    loggedInUser: User;
    deleteReservation: (reservationId: number) => void;
}

const ReservationsOverview: React.FC<ReservationsOverviewProps> = ({
                                                                       reservations,
                                                                       loggedInUser,
                                                                       deleteReservation
                                                                   }: ReservationsOverviewProps) => {
    const { t } = useTranslation();

    const deleteReservationLocal = (target: React.MouseEvent<HTMLButtonElement>) => {
        // @ts-ignore
        const reservationId = parseInt(target.currentTarget.parentElement.parentElement.children[0].textContent);
        deleteReservation(reservationId);
    }
    return (
        <>
            <table className="rounded-lg border-collapse border-spacing-0 border border-blue-900 shadow-lg">
                <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="hidden">ID</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("reservations.startDate")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("reservations.endDate")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("reservations.room")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("reservations.creator")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("reservations.cancel")}</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {reservations && reservations.map((reservation) => {
                    return <tr key={reservation.id} className="hover:bg-blue-100 transition duration-200">
                        <td className="hidden">{reservation.id}</td>
                        { /*  Change the dates to DD/MM/YYYY HH:MM format*/}
                        <td className="px-4 py-2 border border-blue-900">{new Date(reservation.startTime).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</td>
                        <td className="px-4 py-2 border border-blue-900">{new Date(reservation.endTime).toLocaleString('nl-BE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</td>
                        <td className="px-4 py-2 border border-blue-900">{reservation.classroom.classroomNumber}</td>
                        <td className="px-4 py-2 border border-blue-900">{reservation.user.studentNumber}</td>
                        <td className="px-4 py-2 border border-blue-900">{(reservation.user.id === loggedInUser.id || loggedInUser.role === 'admin') ?
                            <button
                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                                onClick={deleteReservationLocal}>
                                Cancel
                            </button>
                            : ''}</td>
                    </tr>;
                })}
                </tbody>
            </table>
        </>
    );
};

export default ReservationsOverview;
