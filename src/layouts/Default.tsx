import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

import DesktopHeadNav from '@/components/Layouts/DesktopHeadNav'
import LogoHeader from '@/components/Layouts/LogoHeader'


const useBackButton = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const isTelegram = window.Telegram?.WebApp !== undefined
        if (!isTelegram) return
        
        const goBack = () => {
            if (window.history.length > 1) {
                navigate(-1)
            } else {
                window.Telegram.WebApp.close()
            }
        }

        const backButton = window.Telegram.WebApp.BackButton
        backButton.show()
        backButton.onClick(goBack)

        return () => {
            backButton.hide()
            backButton.offClick(goBack)
        }
    }, [navigate])
}

const DefaultLayout = () => {
    useBackButton()

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
