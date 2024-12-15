import database from '../util/database';
import { StudentAssociation } from '../model/studentAssociation';
import { UserInput } from '../types';

const getAllStudentAssociations = async (): Promise<StudentAssociation[]> => {
    try {
        const StudentAssociationPrisma = await database.studentAssociation.findMany({
            include: {
                users: true,
            },
        });
        return StudentAssociationPrisma.map((StudentAssociationPrisma) =>
            StudentAssociation.from(StudentAssociationPrisma),
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addUserToStudentAssociation = async ({
    user,
    kboNumber,
}: {
    user: UserInput;
    kboNumber: string;
}): Promise<StudentAssociation> => {
    try {
        const studentAssociationPrisma = await database.studentAssociation.update({
            where: {
                kboNumber: kboNumber,
            },
            include: {
                users: true,
            },
            data: {
                users: {
                    connect: { id: user.id },
                },
            },
        });
        if (studentAssociationPrisma === null) {
            throw new Error('No student association with this KBO number found.');
        } else {
            return StudentAssociation.from(studentAssociationPrisma);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllStudentAssociations,
    addUserToStudentAssociation,
};
