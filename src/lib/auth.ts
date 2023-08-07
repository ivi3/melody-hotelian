import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {ApiAddress} from "@/lib/utils/api";
import {API_ENDPOINTS, BASE_API_URL, NEXT_AUTH_PAGE} from "@/routes/paths";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "enter your username",
                },
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {

                const payload = {
                    username: credentials?.username ?? "",
                    password: credentials?.password ?? ""
                }

                const result = await fetch(BASE_API_URL + ApiAddress(API_ENDPOINTS.auth.login), {
                    method: "POST",
                })

                console.log({credentials, payload, result})
                return null;
            },
        }),
    ],
};
