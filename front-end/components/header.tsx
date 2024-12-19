// components/Header.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { useTranslation } from 'next-i18next';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();
    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    return (
        <header className="p-3 mb-3 border-bottom bg-blue-900">
            <nav className="flex justify-around items-center text-white">
                <Link href="/reservations">{t("header.reservations")}</Link>
                <Link href="/profile">{t("header.profile")}</Link>
                {loggedInUser && loggedInUser.role === 'admin' ? (
                    <Link href="/admin">{t("header.admin")}</Link>
                ) : null}
                {loggedInUser ? (
                    <Link href="/login" onClick={() => sessionStorage.removeItem('loggedInUser')}>
                        {t("header.logout")}, {loggedInUser.studentNumber}
                    </Link>
                ) : (
                    <Link href="/login">{t("header.login")}</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
