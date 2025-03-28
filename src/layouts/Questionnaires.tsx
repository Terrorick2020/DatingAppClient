import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import QuestNavHead from '@/components/Layouts/QuestNavHead';
import QuestMatch from '@/components/Layouts/QuestMatch';
import QuestNavBar from '@/components/Layouts/QuestNavBar';


const QuestLayout = () => {
    const [show, _setShow] = useState(false)

    return (
        <>
            <div className="quest-layout">
                { show && <QuestMatch /> }
                <div className="quest-outlet">
                    <QuestNavHead />
                    <Outlet />
                </div>
                <QuestNavBar />
            </div>
        </>
    )
}

export default QuestLayout