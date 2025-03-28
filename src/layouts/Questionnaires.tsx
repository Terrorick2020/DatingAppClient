import { Outlet } from 'react-router-dom';

import QuestNavBar from '@/components/Layouts/QuestNavBar';
import QuestMatch from '@/components/Layouts/QuestMatch';


const QuestLayout = () => {
    return (
        <>
            <div className="quest-layout">
                <QuestMatch />
                <div className="quest-outlet">
                    <Outlet />
                </div>
                <QuestNavBar />
            </div>
        </>
    )
}

export default QuestLayout