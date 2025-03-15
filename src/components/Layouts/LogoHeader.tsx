import SvgLogoTextColor from '@/assets/icon/logo-text-color.svg?react'


const LogoHeader = () => {
    const userAgent = navigator.userAgent.toLowerCase()

    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android')
    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win')
    const isMobile    = predMobile || !predDesktop

    return (
        <>
            <div className="logo-header" id="logo-header">
                <SvgLogoTextColor
                    style={{
                        marginTop: isMobile ? '4vh' : '0',
                    }}
                />
            </div>
        </>
    )
}

export default LogoHeader
