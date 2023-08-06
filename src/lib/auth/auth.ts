import type {NextAuthOptions} from "next-auth";
import {ApiAddress} from "@/lib/utils/api";
import {API_ENDPOINTS, BASE_API_URL} from "@/routes/paths";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                username: {label: "username", type: "text",},
                password: {label: "Password", type: "password"},
            },
            id: 'jwt',
            name: 'JWT',
            async authorize(credentials) {
                try {
                    const response = await fetch(BASE_API_URL + ApiAddress(API_ENDPOINTS.auth.login),
                        {
                            method: "POST",
                            body: JSON.stringify({
                                ...credentials
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                    const data = await response.json();
                    if (!response.ok) throw Error(data)

                    return {
                        username:credentials?.username,
                        token: data.token
                    } as any
                }catch (e) {
                    return null;
                }
            }
        }),
    ],
};
