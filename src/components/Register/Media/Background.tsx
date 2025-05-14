import { JSX, memo, useMemo } from 'react';
import { PlayingSvgVars } from '@/constant/register';
import type { PropsMediaContentBg } from '@/types/register.typs';

import SvgMediaBack from '@/assets/icon/media-back.svg';
import SvgMediaForward from '@/assets/icon/media-forward.svg';


const MediaContentBg = memo((props: PropsMediaContentBg): JSX.Element => {
    const varianPlaySvg = useMemo(() => PlayingSvgVars[+props.isPlaying], [props.isPlaying]);

    return(
        <>
            <div className={`player__bg ${varianPlaySvg.addClass}`}>
                <nav className="nav">
                    <img
                        src={SvgMediaBack}
                        alt="back"
                        onClick={() => props.handleSeekBy(-10)}
                    />
                    <img
                        src={varianPlaySvg.svg}
                        alt={varianPlaySvg.alt}
                        onClick={props.handlePlaying}
                    />
                    <img
                        src={SvgMediaForward}
                        alt="forward"
                        onClick={() => props.handleSeekBy(10)}
                    />
                </nav>
            </div>
        </>
    )
})

export default MediaContentBg;
