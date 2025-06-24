import { JSX } from 'react';

import SvgLogo from '@/assets/icon/logo.svg';


const AppPreloader = (): JSX.Element => {
    return (
        <div className='preloader' id="preloader">
            <div className="preloader__box">
                <header className='pteloader__header'></header>
                <main className='pteloader__main'>
                    <img
                        alt="logo"
                        loading="lazy"
                        decoding="async"
                        src={ SvgLogo }
                    />
                </main>
                <footer className='pteloader__footer'></footer>
            </div>
        </div>
    )
}

export default AppPreloader;
