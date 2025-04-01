import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { closingBehavior, backButton } from '@telegram-apps/sdk';

import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';

import SvgArrowDown from '@/assets/icon/arrow-down.svg?react';
import SvgArrowLeft from '@/assets/icon/arrow-left.svg?react';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgOther from '@/assets/icon/other.svg?react';


const DesktopHeadNav = () => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userAgent = navigator.userAgent.toLowerCase()

    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android')
    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win')
    const isDesktop   = !predMobile || predDesktop

    const goBack = () => {
        const backRoute = setRoutes.slice(-1)[0];
        navigate(backRoute);
        navigate(-1);
        dispatch(dellRoute());
    };
    const closeWindow = () => window.close();

    const isTgMobile = !!closingBehavior && !!backButton && !isDesktop

    if ( isTgMobile ) {
        if (closingBehavior.mount.isAvailable()) closingBehavior.mount();
        if (backButton.mount.isAvailable()) backButton.mount();
        if (closingBehavior.enableConfirmation.isAvailable()) closingBehavior.enableConfirmation();
        if (backButton.onClick.isAvailable()) {
            backButton.onClick(goBack);
            // backButton.offClick(goBack);
        }
    }

    useEffect(() => {
        if ( isTgMobile) {
            if (!!setRoutes.length && backButton.show.isAvailable()) backButton.show();
            if (!setRoutes.length && backButton.hide.isAvailable()) backButton.hide();
        }
    }, [setRoutes]);

    return (
        <>
            {
                isDesktop
                    ?
                    <div className="desc-head-nav">
                        {
                            !!setRoutes.length
                                ?
                                <Button
                                    className="btn text-fon rounded"
                                    variant="contained"
                                    startIcon={ <SvgArrowLeft /> }
                                    onClick={ goBack }
                                >
                                    Назад
                                </Button>
                                :
                                <Button
                                    className="btn text-fon rounded"
                                    variant="contained"
                                    startIcon={ <SvgClose /> }
                                    onClick={ closeWindow }
                                >
                                    Закрыть
                                </Button>
                        }
                        <Button 
                            className="btn text-fon rounded"
                            variant="contained"
                            startIcon={<SvgArrowDown />}
                            endIcon={<SvgOther />}
                        ></Button>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default DesktopHeadNav
