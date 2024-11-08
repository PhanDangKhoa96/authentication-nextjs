'use client';

import * as React from 'react';
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    X,
} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';

type Tag = {
    value: string;
    label: string;
};

const tags: Tag[] = [
    {value: 'react', label: 'React'},
    {value: 'nextjs', label: 'Next.js'},
    {value: 'typescript', label: 'TypeScript'},
    {value: 'nodejs', label: 'Node.js'},
    {value: 'tailwindcss', label: 'Tailwind CSS'},
    {value: 'prisma', label: 'Prisma'},
    {value: 'mongodb', label: 'MongoDB'},
];

export function SubjectSelect() {
    const [open, setOpen] = React.useState(false);
    const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);

    const handleSelect = (tag: Tag) => {
        setSelectedTags((prev) => {
            if (prev.some((t) => t.value === tag.value)) {
                return prev;
            }
            return [...prev, tag];
        });
    };

    const handleRemove = (tag: Tag) => {
        setSelectedTags((prev) => prev.filter((t) => t.value !== tag.value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (input.value !== '' && e.key === 'Enter') {
            e.preventDefault();
            const newTag = {
                value: input.value.toLowerCase(),
                label: input.value,
            };
            if (!selectedTags.some((tag) => tag.value === newTag.value)) {
                setSelectedTags((prev) => [...prev, newTag]);
                input.value = '';
            }
        }
        if (input.value === '' && e.key === 'Backspace') {
            setSelectedTags((prev) => prev.slice(0, -1));
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="flex min-h-[40px] w-full flex-wrap items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    {selectedTags.map((tag) => (
                        <Badge
                            key={tag.value}
                            variant="secondary"
                            className="flex items-center gap-1">
                            {tag.label}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleRemove(tag)}
                            />
                        </Badge>
                    ))}
                    <input
                        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                        placeholder={
                            selectedTags.length === 0 ? 'Select tags...' : ''
                        }
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command className="rounded-lg border shadow-md ">
                    <CommandInput placeholder="Search tags..." />
                    <CommandEmpty>No tags found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                        {tags.map((tag) => (
                            <CommandItem
                                key={tag.value}
                                onSelect={() => handleSelect(tag)}>
                                <div
                                    className={`mr-2 h-4 w-4 rounded-sm border ${
                                        selectedTags.some(
                                            (t) => t.value === tag.value
                                        )
                                            ? 'bg-black'
                                            : ''
                                    }`}
                                />
                                {tag.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandList className="w-fit h-0"></CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
