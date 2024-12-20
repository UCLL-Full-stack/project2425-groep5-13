import {useState} from "react";
import UserService from "@/services/UserService";
import Header from "@/components/header";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import withAuth from '@/util/withAuth';
const AddUser: React.FC = () => {
    const [formData, setFormData] = useState({studentNumber: '', email: '', password: ''});
    const [success, setSuccess] = useState<boolean>(false);
    const { t } = useTranslation();
    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };
    const handleSubmit = async (_: any) => {
        UserService.createUser(formData).then((result) => setSuccess(result.status === 201));
    };
    return (
        <>
            <Header/>
            <form className="flex flex-col items-center" action={handleSubmit}>
                <p className="my-5 text-3xl">Add user</p>
                <div className="grid grid-cols-2">
                    <div className="grid grid-rows-3 [&>*]:mt-2">
                        <label htmlFor="studentNumber" className="text-2xl">
                            {t("users.studentNumber")}:
                        </label>
                        <label htmlFor="email" className="text-2xl">
                            {t("users.email")}:
                        </label>
                        <label htmlFor="password" className="text-2xl">
                            {t("addUser.password")}:
                        </label>
                    </div>
                    <div className="grid grid-rows-3 [&>*]:mt-2">
                        <input
                            type="text"
                            id="studentNumber"
                            name="studentNumber"
                            onChange={handleChange}
                            value={formData.studentNumber}
                            className="border-grey border-2"
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="border-grey border-2"
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            className="border-grey border-2"
                        />
                    </div>
                </div>
                <button type="submit" className="mt-6">
                    {t("addUser.submit")}
                </button>
                {success ? <p>Successfully added user</p> : <p></p>}
            </form>
        </>
    );
}

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ['common'])),
        }
    }
}

export default withAuth(AddUser);