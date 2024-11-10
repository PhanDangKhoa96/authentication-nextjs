import TeacherList from '@/components/dashboard/TeacherList';
import React, { Suspense } from 'react';
import { getAllTeachers } from '../../../../../../data/teacher';

const TeacherPage = async () => {
    const teachers = await getAllTeachers();
    return (
        <Suspense fallback={<div>Loading teachers...</div>}>
            <TeacherList teachers={teachers} />
        </Suspense>
    );
};

export default TeacherPage;
