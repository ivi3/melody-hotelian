import {FC, useEffect, useCallback, useState, ReactNode} from 'react';
import {useAuthContext} from '../hooks';
import {useRouter} from "@/routes/hooks";

interface AuthGuardProps {
    children: ReactNode;
}

const loginPaths: { [method: string]: string } = {
    jwt: '/auth/jwt/login',
};

const AuthGuard: FC<AuthGuardProps> = ({children}) => {
    const router = useRouter();
    const {authenticated, method} = useAuthContext();
    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!authenticated) {
            const searchParams = new URLSearchParams({
                returnTo: window.location.pathname,
            });
            const loginPath = loginPaths[method];
            const href = `${loginPath}?${searchParams.toString()}`;
            router.replace(href);
        } else {
            setChecked(true);
        }
    }, [authenticated, method, router]);

    useEffect(() => {
        check();
    }, [check]);

    if (!checked) {
        return null;
    }

    return (
        <>{children}</>
    );
};

export default AuthGuard;
