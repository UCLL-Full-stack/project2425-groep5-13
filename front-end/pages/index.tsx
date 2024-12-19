import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem("loggedInUser"))
            router.push('/login');
        else
            router.push("/reservations");
    }, [router]);
}
