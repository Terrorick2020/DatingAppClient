import { Outlet } from 'react-router-dom'

import QuestNavBar from '@/components/Layouts/QuestNavBar'


const QuestLayout = () => {
    return (
        <>
            <div className="quest-layout">
                <div className="quest-outlet">
                    <Outlet />
                </div>
                <QuestNavBar />
            </div>
        </>
    )
}

export default QuestLayout