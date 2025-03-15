import { Outlet } from 'react-router-dom'

import DesctopHeadNav from '@/components/Layouts/DesctopHeadNav'
import LogoHeader from '@/components/Layouts/LogoHeader'


const DefaultLayout = () => {
    const userAgent = navigator.userAgent.toLowerCase()

    const predMobile  = userAgent.includes("iphone") || userAgent.includes("android")
    const predDesctop = userAgent.includes("windows") || userAgent.includes("macintosh") || userAgent.includes("win")
    const isDesctop   = !predMobile || predDesctop

    console.log( userAgent )

    return (
        <>
            <div className="default-layout">
                <div className="box">
                    { isDesctop && <DesctopHeadNav /> }
                    <LogoHeader />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DefaultLayout
