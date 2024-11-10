import AddNewRecord from '@/components/dashboard/AddNewRecord';
import FilterBar from '@/components/dashboard/FilterBar';
import SearchBar from '@/components/dashboard/SearchBar';
import React, {PropsWithChildren} from 'react';

const RecordLayout = ({children}: PropsWithChildren) => {
    return (
        <div className="w-full">
            {/* Header with search and actions */}
            <div className="mb-4 flex items-center justify-between">
                <SearchBar />
                <div className="flex gap-2">
                    <FilterBar />
                    <AddNewRecord  type="add" />
                </div>
            </div>

            {/* Table */}
            {children}
        </div>
    );
};

export default RecordLayout;
