'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';

const attendanceData = [
    {day: 'Mon', present: 430, absent: 30},
    {day: 'Tue', present: 440, absent: 20},
    {day: 'Wed', present: 445, absent: 15},
    {day: 'Thu', present: 435, absent: 25},
    {day: 'Fri', present: 440, absent: 20},
];

const financeData = [
    {month: 'Jan', income: 2500, expense: 2000},
    {month: 'Feb', income: 2700, expense: 2200},
    {month: 'Mar', income: 2400, expense: 2400},
    {month: 'Apr', income: 2800, expense: 2100},
    {month: 'May', income: 2600, expense: 1900},
];

const StatsSection = () => {
    return (
        <div className="flex-1 p-8">
            <div className="grid gap-6">
                {/* Stats Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {title: 'Admins', value: 2},
                        {title: 'Teachers', value: 24},
                        {title: 'Students', value: 460},
                        {title: 'Parents', value: 382},
                    ].map(({title, value}) => (
                        <Card key={title} className="border-2 border-black">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {title}
                                </CardTitle>
                                <span className="text-xs text-gray-500">
                                    2024
                                </span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {value}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-2 border-black">
                        <CardHeader>
                            <CardTitle>Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Bar dataKey="present" fill="#000000" />
                                    <Bar dataKey="absent" fill="#666666" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-black">
                        <CardHeader>
                            <CardTitle>Finance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={financeData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#000000"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="expense"
                                        stroke="#666666"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
