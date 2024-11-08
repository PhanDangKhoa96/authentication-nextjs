import SubjectList from '@/components/dashboard/SubjectList';
import React, {Suspense} from 'react';
import {getAllSubjects} from '../../../../../../data/subject';

const SubjectsPage = () => {
    return (
        <Suspense fallback={<div>Loading subjects...</div>}>
            <SubjectList getSubjectsPromise={getAllSubjects} />
        </Suspense>
    );
};

export default SubjectsPage;
