import { Classroom } from '../model/classroom';
import { ClassroomInput } from '../types';
import database from '../util/database';

const getAllClassrooms = async (): Promise<Classroom[]> => {
    try {
        const classroomPrisma = await database.classroom.findMany();
        return classroomPrisma.map((classroomPrisma) => Classroom.from(classroomPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getClassroomById = async ({ id }: { id: number }): Promise<Classroom | null> => {
    try {
        const classroomPrisma = await database.classroom.findUnique({
            where: { id },
        });
        return classroomPrisma ? Classroom.from(classroomPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getClassroomByCampusAndClassroomNumber = async ({
    campus,
    classroomNumber,
}: {
    campus: string;
    classroomNumber: string;
}): Promise<Classroom | null> => {
    try {
        const classroomPrisma = await database.classroom.findUnique({
            where: {
                campus_classroomNumber: { campus, classroomNumber },
            },
        });
        return classroomPrisma ? Classroom.from(classroomPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createClassroom = async ({ campus, classroomNumber }: ClassroomInput): Promise<Classroom> => {
    try {
        const classroomPrisma = await database.classroom.create({
            data: {
                campus,
                classroomNumber,
            },
        });
        return Classroom.from(classroomPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllClassrooms,
    getClassroomById,
    getClassroomByCampusAndClassroomNumber,
    createClassroom,
};
