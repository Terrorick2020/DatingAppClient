import { JSX, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toMedia } from '@/config/routes.config';
import { useNavigate, useLocation } from 'react-router-dom';
import { setMedaiLink } from '@/store/slices/settingsSlice';
import { FQ_MEDIA_LINK } from '@/config/env.config';
import { warningAlert } from '@/funcs/alert.funcs';
import { addRoute } from '@/store/slices/settingsSlice';
import { fQHeadTxt } from '@/constant/register';
import type { PropsFillingQuestHeader } from '@/types/register.typs';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import SvgVideoHelpers from '@/assets/icon/video-helpers.svg?react';


const FillingQuestHeader = (props: PropsFillingQuestHeader): JSX.Element => {
    const mediaLink = useSelector((state: IState) => state.settings.mediaLink);
    
    const dispatch = useDispatch<RootDispatch>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {      
        if(!mediaLink) {
            warningAlert(
                dispatch,
                'Ссылка недоступна! Попробуйте позже'
            );

            return;
        };

        navigate(toMedia);
        dispatch(addRoute(location.pathname));
    }

    useEffect(() => {
        dispatch(setMedaiLink(FQ_MEDIA_LINK));
    }, [])

    return (
        <>  
            <div className="text">
                <h3 className="headline">{fQHeadTxt[props.mark]}</h3>
                <p className="description">Расскажите немного о себе и о своих планах.</p>
            </div>
            <div className={`video ${!mediaLink && 'disabled'}`} onClick={handleClick}>
                <SvgVideoHelpers />
            </div>
        </>
    )
}

export default FillingQuestHeader;
