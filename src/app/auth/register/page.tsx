'use client';
import Link from "next/link";
import {paths} from "@/routes/paths";
import Image from "next/image";
import toast from "react-hot-toast";
import {SubmitHandler, useForm} from "react-hook-form";
import {UserRegisterRequest, UserRegisterResponse} from "@/lib/types";
import {useState} from "react";
import {useAuthContext} from "@/auth/hooks";

export default function Auth() {
    const {register:registerFetcher} = useAuthContext()
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterRequest>()
    const onSubmit: SubmitHandler<UserRegisterRequest> = (data:UserRegisterRequest) => {
        // setIsLoading(true)
        registerFetcher(data).then((res:UserRegisterResponse)=>{
            if(res.ok){
                console.log({res})
                success()
            }
        }).catch((err)=>{
            console.log({err})
            failed()
        })
    }

    const success =  () => {
        toast.success('You\'ve registered successfully. Please Sign in with your information.');
    }
    const failed =  () => {
        toast.error('Check Your Input Data.');
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        width={691}
                        height={208}
                        className="mx-auto p-10"
                        src="/logo.png"
                        alt="Melody logo"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
                        Sign Up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first-name"
                                    {...register("first_name", { required: true })}
                                    type="text"
                                    autoComplete="firstName"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="last-name"
                                    {...register("last_name", { required: true })}
                                    type="text"
                                    autoComplete="lastName"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    {...register("username", { required: true })}
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register("password", { required: true })}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                // disabled={isLoading}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                                {isLoading && " ..."}
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        <Link href={paths.auth.login} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            have you already registered? click here.
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}
