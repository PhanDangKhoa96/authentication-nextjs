import EventSection from '@/components/dashboard/EventSection';
import StatsSection from '@/components/dashboard/StatsSection';
import { auth } from '../../../../auth';

const SettingPage = async () => {
    const session = await auth();
    return (
        <div className='flex'>
            <StatsSection />
            <EventSection />
        </div>
    );
};

export default SettingPage;
