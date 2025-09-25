import { JSX, MouseEvent } from 'react';
import { playingSvgVars } from '@/constant/register';
import type { PlayingSvgVars } from '@/types/register.typs';

import CircularProgress from '@mui/material/CircularProgress';
import SvgMediaBack from '@/assets/icon/media-back.svg';
import SvgMediaForward from '@/assets/icon/media-forward.svg';


interface PropsMyPlayerNav {
    isLoad: boolean
    playing: boolean
    addClass: string
    setPlaying: (value: boolean) => void
    setSeek: (seconds: number) => void
}
const MyPlayerNav = (props: PropsMyPlayerNav): JSX.Element => {
    const handleNav = (event: MouseEvent) => event.stopPropagation();

    const handleTogglePlay = (): void => {
        props.setPlaying(!props.playing);
    };

    const playerIcon: PlayingSvgVars = playingSvgVars[+props.playing];

    return (
        <div className={`my-player-main__nav ${props.addClass}`}>
        { props.isLoad
            ? <CircularProgress />
            : <nav className="nav-btns" onClick={ handleNav }>
                <button className="nav-btns__item" onClick={() => props.setSeek(-10)}>
                    <img
                        alt="back"
                        loading="lazy"
                        decoding="async"
                        src={ SvgMediaBack }
                    />
                </button>
                <button className="nav-btns__item" onClick={handleTogglePlay}>
                    <img
                        alt={ playerIcon.alt }
                        loading="lazy"
                        decoding="async"
                        src={ playerIcon.svg }
                    />
                </button>
                <button className="nav-btns__item" onClick={() => props.setSeek(10)}>
                    <img
                        alt="forward"
                        loading="lazy"
                        decoding="async"
                        src={ SvgMediaForward }
                    />
                </button>
            </nav>
        }            
        </div>
    )
};

export default MyPlayerNav;
