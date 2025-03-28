import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import QuestNavBar from '@/components/Layouts/QuestNavBar';
import QuestMatch from '@/components/Layouts/QuestMatch';


const QuestLayout = () => {
    const [show, _setShow] = useState(false)

    return (
        <>
            <div className="quest-layout">
                { show && <QuestMatch /> }
                <div className="quest-outlet">
                    <Outlet />
                </div>
                <QuestNavBar />
            </div>
        </>
    )
}

export default QuestLayout