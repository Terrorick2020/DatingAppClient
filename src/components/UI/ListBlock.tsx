import { JSX, memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ANIME_DURATION, ANIME_DELAY } from '@/constant/settings';
import { useDispatch } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { Slide } from 'react-awesome-reveal';
import { EAnimeDirection } from '@/types/settings.type';
import type{ PropsListBlock } from '@/types/ui.types';

import Avatar from '@mui/material/Avatar';


const ListBlock = memo((props: PropsListBlock): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleClick = useCallback((): void => {
        dispatch(addRoute(location.pathname));
        navigate(props.route);
    }, [dispatch, location.pathname, navigate, props.route]);

    const handleView = (inView: boolean): void => {
        if(props.view === undefined) return;

        if (inView) props.view.handleView(props.view.id);
    };

    return (
        <Slide
            triggerOnce
            direction={EAnimeDirection.Left}
            delay={ANIME_DELAY}
            duration={ANIME_DURATION}
            onVisibilityChange={handleView}
        >
            <div className="list-block" onClick={handleClick}>
                <Avatar
                    className="list-block__avatar"
                    alt="list-block-avatar"
                    src={ props.img }
                />
                <div className="list-block__content">
                    { props.children }
                </div>
            </div>
        </Slide>
    )
})

export default ListBlock;
