import { StudentAssociation } from "../model/studentAssociation";
import { User } from "../model/user";

const studentAssociations = [
    new StudentAssociation({
        id: 1,
        kboNumber: "0934567812",
        name: "Ulyssis",
        users: [new User({
            id: 1,
            studentNumber: 'r0945831',
            email: 'john.doe@example.com',
            password: 'password123'
        })]
    }),
    new StudentAssociation({
        id: 2,
        kboNumber: "1573982018",
        name: "ISW",
        users: [new User({
            id: 2,
            studentNumber: 'r0945840',
            email: 'jane.smith@example.com',
            password: 'password456'
        })]
    })
]

const getAllStudentAssociations = (): StudentAssociation[] => studentAssociations

const getStudnetAssociationById = ({ id }: { id: number}): StudentAssociation | null => {
    try {
        return studentAssociations.find((studentAssociation) => studentAssociation.getId() == id) || null
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAllStudentAssociations,
    getStudnetAssociationById
}