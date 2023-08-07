import React, {FC} from 'react'
import MusicList from "@/components/MusicList";
import Header from "@/layouts/Header";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {paths} from "@/routes/paths";
import {authOptions} from "@/lib/auth";


export default async function Home() {
    //todo: next 13.4 issues
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     redirect(paths.auth.login)
    // }

    return (
        <>
            <div className="min-h-full">
                <Header/>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Latest Music List</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <MusicList/>
                    </div>
                </main>
            </div>
        </>
    )
}

