// components/Header.tsx
import Link from 'next/link';

const Header = () => {
    return (
        <header className="p-3 mb-3 border-bottom bg-blue-900">
            <nav className="flex justify-around items-center text-white">
                <Link href="/">Home</Link>
                <Link href="/reservate">Reservate</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/login">Login</Link>
            </nav>
        </header>
    );
};

export default Header;
