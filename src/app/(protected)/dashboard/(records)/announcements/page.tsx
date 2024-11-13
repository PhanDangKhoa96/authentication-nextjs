
import AddNewRecord from '@/components/dashboard/AddNewRecord';
import { getAllAnnouncements } from '../../../../../../data/announcement';
import AnnouncementList from '@/components/dashboard/AnnouncementList';

export default async function AnnouncementPage() {
    const announcements = await getAllAnnouncements();

    return (
        <AnnouncementList announcements={announcements} />
    )
} 