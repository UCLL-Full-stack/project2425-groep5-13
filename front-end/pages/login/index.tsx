import Head from 'next/head';
import Header from '@/components/header';
import UserLoginForm from '@/components/users/UserLoginForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Login: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t("login.login")}</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <UserLoginForm />
                    { /* Create a table with 3 columns, username, password and role. Populate it with 3 rows with easy fillable fields */ }
                    <table>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                        </tr>
                        <tr>
                            <td>r0948731</td>
                            <td>Renzo1234</td>
                            <td>Admin</td>
                        </tr>
                        <tr>
                            <td>r0945821</td>
                            <td>Remco1234</td>
                            <td>Student</td>
                        </tr>
                        <tr>
                            <td>r0985321</td>
                            <td>Tom1234</td>
                            <td>Student</td>
                        </tr>
                    </table>
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ['common'])),
        }
    }
}
export default Login;
