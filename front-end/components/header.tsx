// components/Header.tsx
import Link from 'next/link';
import {useEffect, useState} from "react";
import {User} from "@/types";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    return (
        <header className="p-3 mb-3 border-bottom bg-blue-900">
            <nav className="flex justify-around items-center text-white">
                <Link href="/">Home</Link>
                <Link href="/reservations">Reservations</Link>
                <Link href="/profile">Profile</Link>
                {loggedInUser && loggedInUser.role === "admin" ? <Link href="/admin">Admin</Link> : null}
                {loggedInUser ? <Link href="/login" onClick={() => sessionStorage.removeItem("loggedInUser")}>Logout, {loggedInUser.studentNumber}</Link> : <Link href="/login">Login</Link> }
            </nav>
        </header>
    );
};

export default Header;
