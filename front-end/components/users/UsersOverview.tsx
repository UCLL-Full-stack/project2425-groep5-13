import {useEffect, useState} from "react";
import {User} from "@/types";
import UserService from "@/services/UserService";

type Props = {
    users: User[];
}

const UsersOverview: React.FC<Props> = ({users}: Props) => {
    return (<>
            <table className="rounded-lg border-collapse border-spacing-0 border border-blue-900 shadow-lg">
                <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="px-4 py-2 border border-blue-900 text-left">Student Number</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">Email</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">Role</th>
                    <th className="px-4 py-2 border border-blue-900 text-left">Delete</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {users && users.map((user) => {
                    return <tr key={user.id} className="hover:bg-blue-100 transition duration-200">
                        <td className="px-4 py-2 border border-blue-900">{user.studentNumber}</td>
                        <td className="px-4 py-2 border border-blue-900">{user.email}</td>
                        <td className="px-4 py-2 border border-blue-900">
                            <select onChange={(e) => console.log(e.target.value)} name="role" id={"role"}>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                            </select>
                        </td>
                        <td className="px-4 py-2 border border-blue-900">
                            <button
                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
                                Delete
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