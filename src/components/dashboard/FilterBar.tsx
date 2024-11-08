'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';

const FilterBar = () => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
        <DropdownMenuItem>Name: Z to A</DropdownMenuItem>
        <DropdownMenuItem>Newest First</DropdownMenuItem>
        <DropdownMenuItem>Oldest First</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
  )
}

export default FilterBar