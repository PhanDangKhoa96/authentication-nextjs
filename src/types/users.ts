import {Subject, Teacher} from '@prisma/client';

export type TeacherWithRelations = Teacher & {subjects: Subject[]};
export type SubjectWithRelations = Subject & {teachers: Teacher[]};
