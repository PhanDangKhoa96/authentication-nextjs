import AddNewRecord from '@/components/dashboard/AddNewRecord';
import FilterBar from '@/components/dashboard/FilterBar';
import SearchBar from '@/components/dashboard/SearchBar';
import TeacherList from '@/components/dashboard/TeacherList';

export default function TeacherTable() {
    return (
        <div className="w-full">
            {/* Header with search and actions */}
            <div className="mb-4 flex items-center justify-between">
                <SearchBar />
                <div className="flex gap-2">
                    <FilterBar />
                    <AddNewRecord />
                </div>
            </div>

            {/* Table */}
            <TeacherList />
        </div>
    );
}
