import { Reservation } from '@/types';

interface ReservationsOverviewProps {
    reservations: Reservation[];
}

const ReservationsOverview: React.FC<ReservationsOverviewProps> = ({ reservations }) => {
    return (
        <div>
            <h2>Reservations</h2>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        <p>
                            Classroom: {reservation.classroom.campus} -{' '}
                            {reservation.classroom.classroomNumber}
                        </p>
                        <p>Start Time: {new Date(reservation.starttime).toLocaleString()}</p>
                        <p>End Time: {new Date(reservation.endtime).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationsOverview;
