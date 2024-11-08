import {
    Award,
    Bell,
    Book,
    BookOpen,
    CalendarDays,
    ClipboardList,
    GraduationCap,
    Home,
    MessageSquare,
    PenTool,
    ScrollText,
    Users,
    UserSquare2
} from 'lucide-react';

export const dashboardLinks = [
    {icon: Home, label: 'Dashboard', link: ''},
    {icon: Users, label: 'Teachers', link: 'teachers'},
    {icon: GraduationCap, label: 'Students', link: 'students'},
    {icon: UserSquare2, label: 'Parents', link: 'students'},
    {icon: BookOpen, label: 'Subjects', link: 'subjects'},
    {icon: Book, label: 'Classes', link: 'students'},
    {icon: ScrollText, label: 'Lessons', link: 'students'},
    {icon: PenTool, label: 'Exams', link: 'students'},
    {icon: ClipboardList, label: 'Assignments', link: 'students'},
    {icon: Award, label: 'Results', link: 'students'},
    {icon: CalendarDays, label: 'Attendance', link: 'students'},
    {icon: Bell, label: 'Events', link: 'students'},
    {icon: MessageSquare, label: 'Messages', link: 'students'},
];
