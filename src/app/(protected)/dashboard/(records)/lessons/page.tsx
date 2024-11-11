import LessonList from '@/components/dashboard/LessonList';
import React, { Suspense } from 'react';
import { getAllLessons } from '../../../../../../data/lesson';

const LessonPage = async () => {
    const lessons = await getAllLessons();
    return (
        <Suspense fallback={<div>Loading lessons...</div>}>
            <LessonList lessons={lessons} />
        </Suspense>
    );
};

export default LessonPage;
