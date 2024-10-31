import { Classroom } from "../model/classroom";
import { Reservation } from "../model/reservation";
import { TimeSlot } from "../model/timeSlot";

const classrooms = [
    new Classroom({
        id: 1,
        campus: 'Proximus',
        classroomNumber: "C107" 
    }),
    new Classroom({
        id: 2,
        campus: 'Proximus',
        classroomNumber: "C108" 
    })
]

const getAllClassrooms = (): Classroom[] => classrooms

const getClassroomById = ({ id }: { id: number}): Classroom | null => {
    try {
        return classrooms.find((classroom) => classroom.getId() == id) || null
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

const getClassroomByCampusAndClassroomNumber = ({campus, classroomNumber}: {campus: string, classroomNumber: string}): Classroom | null => {
    try {
        return classrooms.find((classroom) => classroom.getCampus() == campus && classroom.getClassroomNumber() == classroomNumber ) || null
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

const getAllClassroomReservationsByTimeSlot = ({ timeSlot }: { timeSlot: TimeSlot }): Reservation[] => {
    try {
        const reservations: Reservation[] = [];
        classrooms.forEach((classroom) => {
            classroom.getReservations().forEach((reservation) => {
                if (reservation.getTimeSlot().overlapsWith(timeSlot)) {
                    reservations.push(reservation);
                }
            });
        });
        return reservations;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createClassroom = ({campus, classroomNumber}: {campus: string, classroomNumber: string}): Classroom => {
    const classroom = new Classroom({
        campus,
        classroomNumber
    });
    classrooms.push(classroom)
    return classroom
}



export default {
    getAllClassrooms,
    getClassroomById,
    getClassroomByCampusAndClassroomNumber,
    getAllClassroomReservationsByTimeSlot,
    createClassroom
}