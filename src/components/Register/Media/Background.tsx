import { JSX, memo, useMemo } from 'react';
import { PlayingSvgVars } from '@/constant/register';
import type { PropsMediaContentBg } from '@/types/register.typs';

import SvgMediaBack from '@/assets/icon/media-back.svg';
import SvgMediaForward from '@/assets/icon/media-forward.svg';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';


const MediaContentBg = memo((props: PropsMediaContentBg): JSX.Element => {
    const varianPlaySvg = useMemo(() => PlayingSvgVars[+props.isPlaying], [props.isPlaying]);

    if(props.isLoading) return (
        <div className={`player__bg ${varianPlaySvg.addClass}`}>
            <div className="preloader">
                <CircularProgress color="inherit" />
            </div>
        </div>
    )

    return(
        <div className={`player__bg ${varianPlaySvg.addClass}`}>
            {
                props.isError
                    ?
                    <div className="error">
                        <ErrorIcon />
                        <h6 className="headline">Не удалось загрузить видео</h6>
                    </div>
                    :
                    <nav className="nav">
                        <img
                            src={SvgMediaBack}
                            alt="back"
                            loading="lazy"
                            decoding="async"
                            onClick={() => props.handleSeekBy(-10)}
                        />
                        <img
                            src={varianPlaySvg.svg}
                            alt={varianPlaySvg.alt}
                            loading="lazy"
                            decoding="async"
                            onClick={props.handlePlaying}
                        />
                        <img
                            src={SvgMediaForward}
                            alt="forward"
                            loading="lazy"
                            decoding="async"
                            onClick={() => props.handleSeekBy(10)}
                        />
                    </nav>
            }
        </div>
    )
})

export default MediaContentBg;
