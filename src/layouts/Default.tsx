import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { backButton } from '@telegram-apps/sdk'

import DesctopHeadNav from '@/components/Layouts/DesctopHeadNav'
import LogoHeader from '@/components/Layouts/LogoHeader'


const DefaultLayout = () => {

    useEffect(
        () => {
            backButton.show()

            const handleBackButtonClick = () => {
                window.Telegram.WebApp.close()
            }

            const offClick = backButton.onClick(handleBackButtonClick)

            return () => {
                backButton.hide()
                offClick()
            }
        },
        [backButton]
    )

    const userAgent = navigator.userAgent.toLowerCase()

    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android')
    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win')
    const isDesktop   = !predMobile || predDesktop

    return (
        <>
            <div className="default-layout">
                <div className="box">
                    { isDesktop && <DesctopHeadNav /> }
                    <LogoHeader />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default DefaultLayout
