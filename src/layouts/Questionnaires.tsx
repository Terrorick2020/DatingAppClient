import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';

import QuestMatch from '@/components/Layouts/QuestMatch';
import QuestNavBar from '@/components/Layouts/QuestNavBar';


const QuestLayout = () => {
    const isMatch = useSelector((state: IState) => state.likes.match.value);

    return (
        <>
            <div className="quest-layout">
                { isMatch && <QuestMatch /> }
                <div className="quest-outlet">
                    <Outlet />
                </div>
                <QuestNavBar />
            </div>
        </>
    )
}

export default QuestLayout;
