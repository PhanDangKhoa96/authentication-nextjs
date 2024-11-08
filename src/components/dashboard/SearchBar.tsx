'use client';

import {Input} from '@/components/ui/input';
import {Search} from 'lucide-react';
import {useState} from 'react';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
                placeholder="Search teachers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
