'use client';

import {Badge} from '@/components/ui/badge';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {teacherSchema} from '@/schemas/userSchema';
import {Subject} from '@prisma/client';
import {X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import {getAllSubjects} from '../../../../data/subject';

export function SubjectSelect() {
    const [open, setOpen] = useState(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {control} = useFormContext();
    const {
        field: {value = [], onChange},
    } = useController({
        name: 'subjects',
        control,
    });

    const handleSelect = (subject: Subject) => {
        const updatedSubjects = value?.some((s: Subject) => s.id === subject.id)
            ? value
            : [...value, subject];
        onChange(updatedSubjects);
    };

    const handleRemove = (subject: Subject) => {
        const filteredSubjects = value.filter(
            (s: Subject) => s.id !== subject.id
        );
        onChange(filteredSubjects);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (input.value !== '' && e.key === 'Enter') {
            e.preventDefault();
            const newSubject = {
                id: Date.now().toString(), // Temporary ID for new subjects
                name: input.value,
            };
            if (
                !value.some(
                    (subject: Subject) =>
                        subject.name.toLowerCase() ===
                        newSubject.name.toLowerCase()
                )
            ) {
                onChange([...value, newSubject]);
                input.value = '';
            }
        }
        if (input.value === '' && e.key === 'Backspace') {
            onChange(value.slice(0, -1));
        }
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getAllSubjects();

                data && setSubjects(data);
            } catch (err) {
                setError('Failed to load subjects. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="flex min-h-[40px] w-full flex-wrap items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    {value?.map((subject: Subject) => (
                        <Badge
                            key={subject.id}
                            variant="secondary"
                            className="flex items-center gap-1">
                            {subject.name}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleRemove(subject)}
                            />
                        </Badge>
                    ))}
                    <input
                        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                        placeholder={
                            value?.length === 0 ? 'Select subjects...' : ''
                        }
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command className="rounded-lg border shadow-md ">
                    <CommandInput placeholder="Search subjects..." />
                    <CommandEmpty>No subjects found.</CommandEmpty>
                    {isLoading ? (
                        <div>Loading subjects...</div>
                    ) : (
                        <>
                            <CommandGroup className="max-h-64 overflow-auto">
                                {subjects.map((subject) => (
                                    <CommandItem
                                        key={subject.id}
                                        onSelect={() => handleSelect(subject)}>
                                        <div
                                            className={`mr-2 h-4 w-4 rounded-sm border ${
                                                value?.some(
                                                    (s: Subject) =>
                                                        s.id === subject.id
                                                )
                                                    ? 'bg-black'
                                                    : ''
                                            }`}
                                        />
                                        {subject.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandList className="w-fit h-0"></CommandList>
                        </>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}
