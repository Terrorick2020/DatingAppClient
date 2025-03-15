import SvgPreloaderLogo from '@/assets/icon/preloader-logo.svg'


const AppPreloader = () => {
    return (
        <>
            <div id="preloader">
                <div className="preloader__ctx">
                    <img src={ SvgPreloaderLogo } alt="PreloaderLogo" />
                </div>
                <div className="preloader__text">
                    <span className="loader"></span>
                    <h6>Загрузка...</h6>
                </div>
            </div>
        </>
    )
}

export default AppPreloader
