'use client';

// components
import { AuthContext } from './auth-context';
import SplashScreen from "@/components/SplashScreen";

// ----------------------------------------------------------------------

export function AuthConsumer({ children }:{children:React.ReactNode}) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <SplashScreen /> : children)}
    </AuthContext.Consumer>
  );
}
