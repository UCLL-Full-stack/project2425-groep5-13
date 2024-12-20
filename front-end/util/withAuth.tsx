import router from 'next/router';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthenticatedComponent = (props: P) => {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const token = sessionStorage.getItem('loggedInUser');
            if (!token) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        }, [router]);

        if (isLoading) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
    return AuthenticatedComponent;
};

export default withAuth;