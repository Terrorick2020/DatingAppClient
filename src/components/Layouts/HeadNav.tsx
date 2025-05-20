import { JSX, useMemo, useEffect, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { infoAlert } from '@/funcs/alert.funcs';
import { closingBehavior, backButton } from '@telegram-apps/sdk';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import SvgArrowDown from '@/assets/icon/arrow-down.svg?react';
import SvgArrowLeft from '@/assets/icon/arrow-left.svg?react';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgOther from '@/assets/icon/other.svg?react';


const DesktopHeadNav = (): JSX.Element => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);

    const isNavigatingRef = useRef<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const userAgent = navigator.userAgent.toLowerCase();

    const { isDesktop, isTgMobile } = useMemo(() => {
        const predMobile  = userAgent.includes('iphone') || userAgent.includes('android');
        const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win');

        return {
            isDesktop: !predMobile || predDesktop,
            isTgMobile: !!closingBehavior && !!backButton && predMobile,
        };
    }, []);

    const goBack = () => {
        const backRoute = setRoutes.slice(-1)[0];

        infoAlert(dispatch, backRoute);

        if(!isNavigatingRef.current) {
            navigate(backRoute);
            dispatch(dellRoute());
            
            isNavigatingRef.current = true;
        }

        setTimeout(() => {
            isNavigatingRef.current = false;
        }, 300);
    };

    const closeWindow = () => window.close();

    useEffect(() => {
        if (!isTgMobile) return;

        !!setRoutes.length && backButton.show.isAvailable() && backButton.show();
        !setRoutes.length && backButton.hide.isAvailable() && backButton.hide();
    }, [setRoutes]);

    if ( isTgMobile ) {
        if (closingBehavior.mount.isAvailable()) closingBehavior.mount();
        if (backButton.mount.isAvailable()) backButton.mount();
        if (closingBehavior.enableConfirmation.isAvailable()) closingBehavior.enableConfirmation();
        if (backButton.onClick.isAvailable()) {
            backButton.onClick(goBack);
        }
    }

    const btnCtx = useMemo(()=> {
        const hasNav = !!setRoutes.length;

        return {
            svg: !!setRoutes.length ? SvgArrowLeft : SvgClose,
            func: !!setRoutes.length ? goBack : closeWindow,
            text: hasNav ? 'Назад' : 'Закрыть',
        }
    }, [setRoutes]);

    if(!isDesktop) return (<></>);

    return (
        <>
            <div className="desc-head-nav">
                <Button
                    className="btn text-fon rounded"
                    variant="contained"
                    startIcon={ <btnCtx.svg /> }
                    onClick={ btnCtx.func }
                >{btnCtx.text}</Button>
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
