import { Classroom } from "../model/classroom";
import { Reservation } from "../model/reservation";
import { TimeSlot } from "../model/timeSlot";
import classroomDb from "../repository/classroom.db";
import { ClassroomInput } from "../types";

const getAllClassrooms = (): Classroom[] => classroomDb.getAllClassrooms()

const getAllClassroomReservationByTimeSlot = (timeSlot: TimeSlot): Reservation[] => classroomDb.getAllClassroomReservationsByTimeSlot({ timeSlot })

const getClassroomByCampusAndClassroomNumber = async ({campus, classroomNumber}: ClassroomInput ): Promise<Classroom> => {
    const classroom = await classroomDb.getClassroomByCampusAndClassroomNumber({campus, classroomNumber})
    if (!classroom) throw new Error(`Classroom with ${campus} and ${classroomNumber} does not exist.`)
    return classroom
}

const createClassroom = async ({campus, classroomNumber}: ClassroomInput): Promise<Classroom> => {
    if (!campus) {
        throw new Error("Campus is required");
    }
    if (!classroomNumber) {
        throw new Error("ClassroomNumber is required");
    }
    const existingClassroom = classroomDb.getClassroomByCampusAndClassroomNumber({campus, classroomNumber})
    if (existingClassroom) {
        throw new Error("Classroom already exists")
    }
    return classroomDb.createClassroom({campus, classroomNumber})
}

const setReservationForClassroom = async (reservation: Reservation, campus: string, classroomNumber: string): Promise<Classroom> => {
    const classroom = await getClassroomByCampusAndClassroomNumber({campus, classroomNumber})
    return classroom.addReservationToClassroom(reservation)
}

export default {
    getAllClassrooms,
    getAllClassroomReservationByTimeSlot,
    getClassroomByCampusAndClassroomNumber,
    createClassroom,
    setReservationForClassroom 
}