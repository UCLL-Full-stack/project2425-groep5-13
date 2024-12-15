import {Reservation, User} from '@/types';

interface ReservationsOverviewProps {
    reservations: Reservation[];
    loggedInUser: User;
}

const ReservationsOverview: React.FC<ReservationsOverviewProps> = ({ reservations, loggedInUser }: ReservationsOverviewProps) => {
    return (
        <>
            <table className="rounded-lg border-collapse border-spacing-0 border border-blue-900 shadow-lg">
                <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="px-4 py-2 border border-blue-900 text-left">Start Date</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">End Date</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">Room</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">Creator</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">Cancel</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                { reservations && reservations.map((reservation) => {
                    return <tr key={reservation.id} className="hover:bg-blue-100 transition duration-200">
                        <td className="px-4 py-2 border border-blue-900">{reservation.startTime.toString()}</td>
                        <td className="px-4 py-2 border border-blue-900">{reservation.endTime.toString()}</td>
                        <td className="px-4 py-2 border border-blue-900">{reservation.classroom.classroomNumber}</td>
                        <td className="px-4 py-2 border border-blue-900">{reservation.user.studentNumber}</td>
                        <td className="px-4 py-2 border border-blue-900">{(reservation.user.id === loggedInUser.id || loggedInUser.role === "admin") ? <button
                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
                                Cancel
                            </button>
                            : ""}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
};

export default ReservationsOverview;
