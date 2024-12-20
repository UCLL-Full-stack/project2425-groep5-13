import {useEffect, useState} from "react";
import TableWidthButton from "@/components/TableWidthButton";
import Header from "@/components/header";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import withAuth from '@/util/withAuth';
import { ClassroomService } from '@/services/ClassroomService';
import ClassroomsOverview from '@/components/classrooms/ClassroomsOverview';
import { Classroom } from '@/types';

const Classrooms: React.FC = () => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<Classroom | null>(null);

    const { t } = useTranslation();

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        } else {
            return;
        }
    }, []);
    useEffect(() => {
        const getClassrooms = async () => {
            if (!loggedInUser) {
                return;
            }

            const response = await ClassroomService.getAllClassrooms();

            if (!response.ok) {
                console.log(response);
            } else {
                const users = await response.json();
                setClassrooms(users);
            }
        };
        if (loggedInUser) {
            getClassrooms();
        }
    }, [loggedInUser]);
    const deleteClassroom = async (classroomId: number) => {
        const response = await ClassroomService.deleteClassroom(classroomId);
        if (!response.ok) {
            console.log(response);
        } else {
            const newClassrooms = classrooms.filter((classroom) => classroom.id !== classroomId);
            setClassrooms(newClassrooms);
        }
    }
    return (<>
        <Header/>
        <div className="flex flex-col items-center">
            <div className="flex flex-col">
                <ClassroomsOverview classrooms={classrooms} deleteClassroom={deleteClassroom}/>
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

export default withAuth(Classrooms);