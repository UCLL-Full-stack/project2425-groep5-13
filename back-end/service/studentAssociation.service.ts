import { StudentAssociation } from "../model/studentAssociation";
import studentAssociationDb from "../repository/studentAssociation.db";

const getAllStudentAssociations = async (): Promise<StudentAssociation[]> => studentAssociationDb.getAllStudentAssociations()

export default {
    getAllStudentAssociations
}