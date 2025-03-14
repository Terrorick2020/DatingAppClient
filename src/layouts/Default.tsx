import { Outlet } from 'react-router-dom'

import DesctopHeadNav from '@/components/Layouts/DesctopHeadNav'
import LogoHeader from '@/components/Layouts/LogoHeader'


const DefaultLayout = () => {
    return (
        <>
            <div className="default-layout">
                <div className="box">
                    <DesctopHeadNav />
                    <LogoHeader />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DefaultLayout
