'use client';

import React, {createContext, useMemo} from 'react';
import {UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse} from "@/lib/types";

// ----------------------------------------------------------------------
export interface AuthContextType {
    user: Record<string, any>;
    method: string;
    isInitialized: boolean,
    isAuthenticated: boolean,
    loading: boolean,
    login: (user: UserLoginRequest) => Promise<unknown>,
    register: (user: UserRegisterRequest) => Promise<UserRegisterResponse>,
    logout: () => Promise<unknown>,
}

export const AuthContext = createContext<AuthContextType>({
    user: {},
    method: 'jwt',
    isInitialized: false,
    isAuthenticated: false,
    loading: false,
    login(user: UserLoginRequest): Promise<UserLoginResponse> {
        return Promise.resolve({
            ok: "",
            result: {
                access_token: "",
                access_token_expration: ""
            }
        });
    }, register(user: UserRegisterRequest): Promise<UserRegisterResponse> {
        return Promise.resolve({
            ok: "",
            result: {
                first_name: "",
                last_name: "",
                username: "",
                id: 1,
            }
        });
    }, logout(): Promise<unknown> {
        return Promise.resolve(undefined);
    },
});
