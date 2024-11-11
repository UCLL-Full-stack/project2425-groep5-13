import { Classroom } from "../model/classroom";
import classroomDb from "../repository/classroom.db";
import { ClassroomInput } from "../types";

const getAllClassrooms = async (): Promise<Classroom[]> => {
    return classroomDb.getAllClassrooms()
}

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
    const existingClassroom = await classroomDb.getClassroomByCampusAndClassroomNumber({campus, classroomNumber})
    if (existingClassroom) {
        throw new Error("Classroom already exists")
    }
    return classroomDb.createClassroom({campus, classroomNumber})
}

export default {
    getAllClassrooms,
    getClassroomByCampusAndClassroomNumber,
    createClassroom
}