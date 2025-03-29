import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk';

import DesktopHeadNav from '@/components/Layouts/DesktopHeadNav';
import LogoHeader from '@/components/Layouts/LogoHeader';


// const useBackButton = () => {
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (backButton.mount.isAvailable()) {
//             backButton.mount();
//         }

//         if (backButton.show.isAvailable()) {
//             backButton.show();
//             backButton.isVisible();
//         }

//     }, [navigate])
// }

const DefaultLayout = () => {
    // useBackButton()

    if (backButton.mount.isAvailable()) {
        backButton.mount();
    }

    if (backButton.show.isAvailable()) {
        backButton.show();
    }

    const userAgent = navigator.userAgent.toLowerCase()

    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android')
    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win')
    const isDesktop   = !predMobile || predDesktop

    return (
        <>
            <div className="default-layout">
                <div className="box">
                    { isDesktop && <DesktopHeadNav /> }
                    <LogoHeader />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DefaultLayout
