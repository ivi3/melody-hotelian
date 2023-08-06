'use client';

import { useContext } from 'react';
import {AuthContext, AuthContextType} from '../context/jwt/auth-context';

export const useAuthContext = (): AuthContextType => {
  const context = useContext<AuthContextType>(AuthContext);

  if (!context) throw new Error('useAuthContext must be used within AuthProvider');

  return context;
};