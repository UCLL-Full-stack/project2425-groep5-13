import {useEffect, useState} from "react";
import {User} from "@/types";
import UserService from "@/services/UserService";
import { useTranslation } from 'next-i18next';

type Props = {
    users: User[];
    updateUser: (userId: number, role: string) => void;
}

const UsersOverview: React.FC<Props> = ({users, updateUser}: Props) => {
    const { t } = useTranslation();

    const updateUserLocal = (target: React.MouseEvent<HTMLButtonElement>) => {
        // @ts-ignore
        const userId = parseInt(target.currentTarget.parentElement.parentElement.children[0].textContent);
        updateUser(userId, target.target.value);
    }

    return (<>
            <table className="rounded-lg border-collapse border-spacing-0 border border-blue-900 shadow-lg">
                <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="hidden">ID</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("users.studentNumber")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("users.email")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("users.role")}</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">{t("users.delete")}</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {users && users.map((user) => {
                    return <tr key={user.id} className="hover:bg-blue-100 transition duration-200">
                        <td className="hidden">{user.id}</td>
                        <td className="px-4 py-2 border border-blue-900">{user.studentNumber}</td>
                        <td className="px-4 py-2 border border-blue-900">{user.email}</td>
                        <td className="px-4 py-2 border border-blue-900">
                            <select onChange={updateUserLocal} name="role" id={"role"}>
                                <option value="admin" selected={ user.role === "admin" ? true: false }>Admin</option>
                                <option value="student" selected={ user.role === "student" ? true : false }>Student</option>
                            </select>
                        </td>
                        <td className="px-4 py-2 border border-blue-900">
                            <button
                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
                                {t("delete")}
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    )
}

export default UsersOverview;