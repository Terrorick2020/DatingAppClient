import { JSX, useState, useMemo, useEffect } from 'react';
import { toMedia } from '@/config/routes.config';
import { warningAlert } from '@/funcs/alert.funcs';
import { setMedaiLink, addRoute } from '@/store/slices/settingsSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { PropsPlayerBtn } from '@/types/ui.types';
import type { RootDispatch } from '@/store';

import Skeleton from '@mui/material/Skeleton';
import ErrorIcon from '@mui/icons-material/Error';
import SvgMediaPlay from '@/assets/icon/media-play.svg';


const PlayerBtn = (props: PropsPlayerBtn): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isErr, setIsErr] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRoute = (): void => {
        if(!isLoaded || isErr) return;

        dispatch(setMedaiLink(props.urlVideo));

        setTimeout(() => {
            dispatch(addRoute(location.pathname));
            navigate(toMedia);
        }, 250);
    };

    useEffect(() => {
        if (!props.urlImg || !props.urlVideo) {
            warningAlert(dispatch, 'Видео не доступно для проигрывания');
            setIsErr(true);
            return;
        };

        const img = new Image();
        img.src = props.urlImg;

        img.onload = () => setIsLoaded(true);
        img.onerror = () => {
            setIsLoaded(false);
            setIsErr(true);
        }
    }, [props.urlImg, props.urlVideo]);

    const CtxHTML = useMemo(() => {
        if(!isLoaded)
            return ( <Skeleton variant="rectangular" /> );

        if(isErr)
            return (
                <div className="error">
                    <ErrorIcon />
                    <p>Ошибка загрузки видео</p>
                </div>
            );

        return (
            <img
                src={SvgMediaPlay}
                alt="back"
                loading="lazy"
                decoding="async"
            />
        );
    }, [isLoaded, isErr]);
    
    return (
        <div
            className={`player-btn ${isLoaded ? 'activeted' : 'disabled'}`}
            style={{
                backgroundImage: isLoaded ? `url(${props.urlImg})` : '',
                background: isErr ? '#FFFFFF1F' : '',
            }}
            onClick={handleRoute}
        >{ CtxHTML }</div>
    )
};

export default PlayerBtn;
