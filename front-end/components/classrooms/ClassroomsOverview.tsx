import {useEffect, useState} from "react";
import { Classroom, User } from '@/types';
import UserService from "@/services/UserService";
import { useTranslation } from 'next-i18next';

type Props = {
    classrooms: Classroom[];
    deleteClassroom: (classroomId: number) => void;
}

const ClassroomsOverview: React.FC<Props> = ({classrooms, deleteClassroom}: Props) => {
    const { t } = useTranslation();

    const deleteClassroomLocal = (target: any) => {
        const userId = parseInt(target.currentTarget.parentElement.parentElement.children[0].textContent);
        deleteClassroom(userId);
    }

    return (<>
            <table className="rounded-lg border-collapse border-spacing-0 border border-blue-900 shadow-lg">
                <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="hidden">ID</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("classrooms.campus")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("classrooms.classroomNumber")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("users.delete")}</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {classrooms && classrooms.map((classroom) => {
                    return <tr key={classroom.id} className="hover:bg-blue-100 transition duration-200">
                        <td className="hidden">{classroom.id}</td>
                        <td className="px-4 py-2 border border-blue-900">{classroom.campus}</td>
                        <td className="px-4 py-2 border border-blue-900">{classroom.classroomNumber}</td>
                        <td className="px-4 py-2 border border-blue-900">
                            <button
                                onClick={deleteClassroomLocal}
                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
                                {t('delete')}
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    )
}

export default ClassroomsOverview;