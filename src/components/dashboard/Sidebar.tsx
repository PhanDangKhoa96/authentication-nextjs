'use client';

import {cn} from '@/lib/utils';
import {LogOut, Settings} from 'lucide-react';
import {signOut} from 'next-auth/react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {dashboardLinks} from '../../../data/dashboard-pages';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-black p-4 text-white sticky top-0 h-fit">
            <div className="mb-8">
                <h2 className="text-xl font-bold">School Manager</h2>
            </div>
            <nav className="space-y-2">
                {dashboardLinks.map(({icon: Icon, label, link}) => {
                    const url = `/dashboard${link ? `/${link}` : ''}`;
                    const isActive = pathname === url;
                    return (
                        <Link
                            key={label}
                            href={url}
                            className={cn(
                                'flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium ',
                                isActive
                                    ? 'text-black bg-white'
                                    : 'hover:bg-white/10'
                            )}>
                            <Icon className="h-5 w-5" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-8 space-y-2">
                <h3 className="px-4 text-sm font-medium text-gray-400">
                    OTHER
                </h3>
                <a
                    href="#"
                    className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white/10">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </a>
                <button
                    onClick={() => signOut()}
                    className="flex items-center w-full justify-start space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white/10">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
