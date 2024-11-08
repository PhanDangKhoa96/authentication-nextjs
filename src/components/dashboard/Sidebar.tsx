'use client';

import {
    Award,
    Bell,
    Book,
    BookOpen,
    CalendarDays,
    ClipboardList,
    GraduationCap,
    Home,
    LogOut,
    MessageSquare,
    PenTool,
    ScrollText,
    Settings,
    Users,
    UserSquare2,
} from 'lucide-react';
import Link from 'next/link';
import {auth} from '../../../auth';
import {signOut, useSession} from 'next-auth/react';
import {Button} from '../ui/button';

const Sidebar = () => {
    return (
        <div className="w-64 bg-black p-4 text-white">
            <div className="mb-8">
                <h2 className="text-xl font-bold">School Manager</h2>
            </div>
            <nav className="space-y-2">
                <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                </Link>
                {[
                    {icon: Users, label: 'Teachers', link: 'teachers'},
                    {icon: GraduationCap, label: 'Students'},
                    {icon: UserSquare2, label: 'Parents'},
                    {icon: BookOpen, label: 'Subjects'},
                    {icon: Book, label: 'Classes'},
                    {icon: ScrollText, label: 'Lessons'},
                    {icon: PenTool, label: 'Exams'},
                    {icon: ClipboardList, label: 'Assignments'},
                    {icon: Award, label: 'Results'},
                    {icon: CalendarDays, label: 'Attendance'},
                    {icon: Bell, label: 'Events'},
                    {icon: MessageSquare, label: 'Messages'},
                ].map(({icon: Icon, label, link}) => (
                    <Link
                        key={label}
                        href={`/dashboard/${link || '#'}`}
                        className="flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white/10">
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                    </Link>
                ))}
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
