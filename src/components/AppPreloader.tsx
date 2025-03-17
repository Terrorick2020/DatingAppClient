import SvgPreloaderHeader from '@/assets/icon/preloader-header.svg'
import SvgPreloaderFooter from '@/assets/icon/preloader-footer.svg'
import SvgWhiteHeart from '@/assets/icon/white-heart.svg'
import Svg3Date from '@/assets/icon/3date.svg'


const AppPreloader = () => {
    return (
        <>
            <div id="preloader">
                <div className="preloader__box">
                    <header className="preloader__header">
                        <img className="preloader-img" src={ SvgPreloaderHeader } alt="preloader-header" />
                    </header>
                    <main className="preloader__main">
                        <img src={ SvgWhiteHeart } alt="white-heart" />
                        <img src={ Svg3Date } alt="3Date" />
                    </main>
                    <footer className="preloader__footer">
                        <img className="preloader-img" src={ SvgPreloaderFooter } alt="preloader-footer" />
                    </footer>
                </div>
            </div>
        </>
    )
}

export default AppPreloader
