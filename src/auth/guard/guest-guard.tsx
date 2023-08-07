import { useCallback, useEffect, ReactNode } from 'react';
import { useAuthContext } from '../hooks';
import {paths} from "@/routes/paths";
import {useRouter, useSearchParams} from "@/routes/hooks";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo')|| paths.website.root;

  const { isAuthenticated } = useAuthContext();

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(returnTo);
    }
  }, [isAuthenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
};

export default GuestGuard;