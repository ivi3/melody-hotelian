'use client';
import React, {FC} from "react";
import {Disclosure} from "@headlessui/react";
import Image from "next/image";
import {BellIcon} from "@heroicons/react/24/outline";
import AppMenu from "@/sections/home/AppMenu";
import MobileMenuButton from "@/sections/home/MobileMenuButton";
import MobileAppMenu from "@/sections/home/MobileAppMenu";

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

interface UserNavigationItem {
    name: string;
    href: string;
}


const navigation: NavigationItem[] = [
    {name: 'Dashboard', href: '#', current: true},
    {name: 'Team', href: '#', current: false},
    {name: 'Projects', href: '#', current: false},
]

const userNavigation: UserNavigationItem[] = [
    {name: 'Your Profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

function classNames(...classes: (string | boolean)[]): string {
    return classes.filter(Boolean).join(' ')
}

const Header:FC = ()=>{
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Image
                                        width={32}
                                        height={32}
                                        src="sample-logo.svg"
                                        alt="Melody"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>

                                    {/* Profile dropdown */}
                                    <AppMenu userNavigation={userNavigation}/>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <MobileMenuButton open={open}/>
                            </div>
                        </div>
                    </div>

                    <MobileAppMenu navigation={navigation} userNavigation={userNavigation}/>
                </>
            )}
        </Disclosure>
    )
}

export default Header;