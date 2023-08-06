import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { decode } from 'next-auth/jwt';
import { isEmpty } from './general';
import {RootState} from "@/lib/redux/store";
import {BASE_API_URL} from "@/routes/paths";

export function makeGetQuery(params: { [key: string]: any }): string {
  const queryParams = [];
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      queryParams.push(`${key}=${value}`);
    }
  }
  return `?${queryParams.join('&')}`;
}

export function ApiAddress(address: string, params?: Record<string, any> ): string {
  if (isEmpty(params)) {
    return address;
  }

  if (!isEmpty(params?.query)) {
    params = { ...params, query: makeGetQuery(params?.query) };
  }

  // @ts-ignore
  for (const [index, value] of Object.entries(params)) {
    const pattern = `:${index}`;
    if (address.includes(pattern)) {
      address = address.replace(pattern, value);
    }
  }
  return address;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  timeout: 30000,
  prepareHeaders: async (headers, getState) => {
    const token = (getState.getState() as RootState).auth.token
    const decoded = await decode({
      token,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (decoded?.token) {
      headers.set('AUTHORIZATION', `Bearer ${decoded.token}`);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});
