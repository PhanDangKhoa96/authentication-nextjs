import { Event, Lesson, Subject, Teacher, Announcement } from '@prisma/client';

export type TeacherWithRelations = Teacher & { subjects: Subject[] };
export type SubjectWithRelations = Subject & { teachers: Teacher[] };
export type LessonWithRelations = Lesson & {
    subject: Subject;
    teacher: Teacher;
};
export type EventWithRelations = Event;


export type AnnouncementWithRelations = Announcement;
