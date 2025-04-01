import { Outlet } from 'react-router-dom';

import DesktopHeadNav from '@/components/Layouts/DesktopHeadNav';
import MobileHeadNav from '@/components/Layouts/MobileHeadNav';
import LogoHeader from '@/components/Layouts/LogoHeader';


const DefaultLayout = () => {
    const userAgent = navigator.userAgent.toLowerCase()

    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android')
    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win')
    const isDesktop   = !predMobile || predDesktop

    return (
        <>
            <div className="default-layout">
                <div className="box">
                    { isDesktop ? <DesktopHeadNav /> : <MobileHeadNav /> }
                    <LogoHeader />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DefaultLayout
