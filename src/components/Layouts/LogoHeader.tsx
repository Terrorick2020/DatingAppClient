import SvgLogo from '@/assets/icon/logo.svg?react'


const LogoHeader = () => {
    const userAgent = navigator.userAgent.toLowerCase()

    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android')
    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win')
    const isMobile    = predMobile || !predDesktop

    return (
        <>
            <div className="logo-header" id="logo-header">
                <SvgLogo
                    className="logo"
                    style={{
                        marginTop: isMobile ? '3.5vh' : '0',
                    }}
                />
            </div>
        </>
    )
}

export default LogoHeader
