'use client';

import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react';

import {AuthContext} from './auth-context';
import {paths} from "@/routes/paths";
import {signIn, signOut, useSession} from "next-auth/react";
import {UserLoginRequest, UserRegisterRequest, UserRegisterResponse} from "@/lib/types";
import {useRegisterMutation} from "@/lib/redux/api/AuthSliceApi";
import {useRouter} from "next/navigation";
import {useSearchParams} from "@/routes/hooks";

// ----------------------------------------------------------------------


const initialState = {
  user: null,
  loading: true,
};

const reducer = (state:any, action:any) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({children}: { children: React.ReactNode }) {
  const {data} = useSession()

  const [isLoading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const query = useSearchParams()

  const [_registerMutation, {isLoading: registerIsLoading}] = useRegisterMutation()

  const initialize = useCallback(async () => {
    if (data) {
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: true,
          user: data.user
        },
      });
    } else {
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [data]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const callbackUrl = useMemo(()=>(query.get('callbackUrl') as string ?? "/"),[query])



  // LOGIN
  const login = useCallback(async (user:UserLoginRequest) => new Promise((resolve, reject) => {
    setLoading(true)

    signIn("jwt", {
      redirect: true,
      ...user,
      callbackUrl,
    }).then((value) => {
      setLoading(false)
      return value?.ok
          ? resolve({})
          : reject()
    }).catch((err) => {
      reject(err)
    })
  }), [callbackUrl]);

  // REGISTER
  const register = useCallback(async (user:UserRegisterRequest) => {
    return _registerMutation(user).unwrap().then((response:UserRegisterResponse)=>{
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
      console.log({response})
      return response
    })
  }, [_registerMutation]);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut({
      callbackUrl: paths.auth.login
    });
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(() => ({
    isInitialized: state.isInitialized,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    method: 'jwt',
    loading:isLoading,
    login,
    register,
    logout,
  }), [state.isInitialized, state.isAuthenticated, state.user, isLoading, login, register, logout]);

  return (
      <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
  );
}