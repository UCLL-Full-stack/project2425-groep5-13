import { useEffect, useState } from 'react';
import { Reservation, Classroom } from '@/types';
import { ReservationService } from '@/services/ReservationService';
import { ClassroomService } from '@/services/ClassroomService';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const ReservationForm: React.FC = () => {
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [classroomId, setClassroomId] = useState<number | null>(null);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const router = useRouter();
    useEffect(() => {
        const fetchClassrooms = async () => {
            const response = await ClassroomService.getAllClassrooms();
            if (response.ok) {
                const data = await response.json();
                setClassrooms(data);
            } else {
                setError('Failed to fetch classrooms');
            }
        };

        fetchClassrooms();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const selectedClassroom = classrooms.find((classroom) => classroom.id === classroomId);
        if (!selectedClassroom) {
            setError('Selected classroom is invalid');
            return;
        }

        const reservationData = {
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            classroom: selectedClassroom,
            user: JSON.parse(sessionStorage.getItem('loggedInUser') || '{}'),
        };

        const response = await ReservationService.createReservation(reservationData);

        if (response.ok) {
            const reservation = await response.json();
            setStartTime('');
            setEndTime('');
            setClassroomId(null);
            setTimeout(() => {
                router.push(`/reservations`);
            });
        } else {
            const { errorMessage } = await response.json();
            setError(errorMessage || 'Failed to create reservation');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h2 className="text-2xl mb-4">{t("reservations.addNewReservation")}</h2>
            {error && <p className="text-red-800">{error}</p>}
            <div className="mb-4">
                <label htmlFor="startTime" className="block mb-2 text-sm font-medium">
                    {t('reservations.startDate')}:
                </label>
                <input
                    type="datetime-local"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="endTime" className="block mb-2 text-sm font-medium">
                    {t('reservations.endDate')}:
                </label>
                <input
                    type="datetime-local"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="classroom" className="block mb-2 text-sm font-medium">
                    {t('classrooms.classroom')}:
                </label>
                <select
                    id="classroom"
                    value={classroomId || ''}
                    onChange={(e) => setClassroomId(Number(e.target.value))}
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option value="" disabled>
                        {t("reservations.selectClassroom")}
                    </option>
                    {classrooms.map((classroom) => (
                        <option key={classroom.id} value={classroom.id}>
                            {classroom.campus} - {classroom.classroomNumber}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                {t('reservations.addNewReservation')}
            </button>
        </form>
    );
};

export default ReservationForm;
