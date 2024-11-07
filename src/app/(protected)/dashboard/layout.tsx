import Sidebar from '@/components/dashboard/Sidebar';
import React, {PropsWithChildren} from 'react';

const DashboardLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="p-4 min-h-screen flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;
