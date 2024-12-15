import { StudentAssociation } from '../model/studentAssociation';
import studentAssociationDb from '../repository/studentAssociation.db';
import { UserInput } from '../types';

const getAllStudentAssociations = async (): Promise<StudentAssociation[]> =>
    studentAssociationDb.getAllStudentAssociations();

const addUserToStudentAssociation = async ({
    user,
    kboNumber,
}: {
    user: UserInput;
    kboNumber: string;
}): Promise<StudentAssociation> =>
    studentAssociationDb.addUserToStudentAssociation({ user, kboNumber });

export default {
    getAllStudentAssociations,
    addUserToStudentAssociation,
};
