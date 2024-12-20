import Head from 'next/head';
import Header from '@/components/header';
import UserLoginForm from '@/components/users/UserLoginForm';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';

const Login: React.FC = () => {
    const {t} = useTranslation();
    const users = [
        { username: 'r0948731', password: 'Renzo1234', role: 'Admin' },
        { username: 'r0945821', password: 'Remco1234', role: 'Student' },
        { username: 'r0985321', password: 'Tom1234', role: 'Student' },
    ];

    return (
        <>
            <Head>
                <title>{t("login.login")}</title>
            </Head>
            <Header/>
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm/>
                    <table>
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const {locale} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ['common'])),
        }
    }
}
export default Login;
