import UsersOverview from "@/components/users/UsersOverview";
import {useEffect, useState} from "react";
import {User} from "@/types";
import UserService from "@/services/UserService";
import TableWidthButton from "@/components/TableWidthButton";
import Header from "@/components/header";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Admin: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const { t } = useTranslation();

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
                <TableWidthButton text={t("users.addUser")} dest="/admin/addUser"/>
                <UsersOverview users={users}/>
                <TableWidthButton text={t("users.addUser")} dest="/admin/addUser"/>
            </div>
        </div>
    </>);
}

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ['common'])),
        }
    }
}

export default Admin;