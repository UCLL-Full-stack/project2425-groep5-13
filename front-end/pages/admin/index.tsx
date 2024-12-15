import UsersOverview from "@/components/users/UsersOverview";
import {useEffect, useState} from "react";
import {User} from "@/types";
import UserService from "@/services/UserService";
import TableWidthButton from "@/components/TableWidthButton";
import Header from "@/components/header";

const Admin: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
            console.log(user);
        } else {
            console.log("ops")
            return;
        }
    }, []);

    useEffect(() => {
        const getReservationsByUser = async () => {
            if (!loggedInUser) {
                return;
            }

            const response = await UserService.getAllUsers();

            if (!response.ok) {
                console.log(response);
            } else {
                const users = await response.json();
                setUsers(users);
                console.log(users);

            }
        };
        if (loggedInUser) {
            getReservationsByUser();
        }
    }, [loggedInUser]);

    return (<>
        <Header/>
        <div className="flex flex-col items-center">
            <div className="flex flex-col">
                <TableWidthButton text="Add a new user"/>
                <UsersOverview users={users}/>
                <TableWidthButton text="Add a new user"/>
            </div>
        </div>
    </>);
}

export default Admin;