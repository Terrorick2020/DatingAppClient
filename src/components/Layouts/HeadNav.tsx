import { JSX, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { closingBehavior, backButton } from '@telegram-apps/sdk';
import { infoAlert } from '@/funcs/alert.funcs';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import SvgArrowDown from '@/assets/icon/arrow-down.svg?react';
import SvgArrowLeft from '@/assets/icon/arrow-left.svg?react';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgOther from '@/assets/icon/other.svg?react';


const DesktopHeadNav = (): JSX.Element => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const userAgent = navigator.userAgent.toLowerCase();

    const predMobile  = userAgent.includes('iphone') || userAgent.includes('android');
    const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win');
    const isDesktop   = !predMobile || predDesktop;

    const isTgMobile = !!closingBehavior && !!backButton && !isDesktop;

    const goBack = () => {
        const remainingRoutes = setRoutes.length - 1;

        const backRoute = setRoutes.slice(-1)[0];
        navigate(backRoute);
        dispatch(dellRoute());

        if(isTgMobile) {
            if (backButton.show.isAvailable() && remainingRoutes > 0) {
                backButton.show();
            } else if (backButton.hide.isAvailable()) {
                backButton.hide();
            }
        }
        
    };
    const closeWindow = () => window.close();

    useEffect(
        () => {
            infoAlert(
                dispatch,
                String(setRoutes)
            )

            isTgMobile &&
                !!setRoutes.length &&
                backButton.show.isAvailable() &&
                backButton.show();
        },
        [setRoutes]
    )

    if ( isTgMobile ) {
        if (closingBehavior.mount.isAvailable()) closingBehavior.mount();
        if (backButton.mount.isAvailable()) backButton.mount();
        if (closingBehavior.enableConfirmation.isAvailable()) closingBehavior.enableConfirmation();
        if (backButton.onClick.isAvailable()) {
            backButton.onClick(goBack);
        }
    }

    if(!isDesktop) return (<></>);

    return (
        <>
            <div className="desc-head-nav">
                {
                    !!setRoutes.length
                        ?
                        <Button
                            className="btn text-fon rounded"
                            variant="contained"
                            startIcon={ <SvgArrowLeft /> }
                            onClick={ goBack }
                        >Back</Button>
                        :
                        <Button
                            className="btn text-fon rounded"
                            variant="contained"
                            startIcon={ <SvgClose /> }
                            onClick={ closeWindow }
                        >Close</Button>
                }
                <Button 
                    className="btn text-fon rounded"
                    variant="contained"
                    startIcon={<SvgArrowDown />}
                    endIcon={<SvgOther />}
                />
            </div>
        </>
    )
}

export default DesktopHeadNav;
