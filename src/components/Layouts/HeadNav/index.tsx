import { JSX, useMemo, useEffect, useState } from 'react';
import { closingBehavior, backButton, viewport } from '@telegram-apps/sdk';
import { useNavigate  } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { warningAlert, infoAlert } from '@/funcs/alert.funcs';
import { useSelector, useDispatch } from 'react-redux';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import HeadNavExitDialog from './ExitDialog';
import SvgArrowDown from '@/assets/icon/arrow-down.svg?react';
import SvgArrowLeft from '@/assets/icon/arrow-left.svg?react';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgOther from '@/assets/icon/other.svg?react';


const HeadNav = (): JSX.Element => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);

    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const userAgent = navigator.userAgent.toLowerCase();

    const isTgMobile = useMemo(() => {
        const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win');
        const predMobile  = userAgent.includes('iphone') || userAgent.includes('android');

        const isDesktop  = !predMobile || predDesktop;
        const isTgMobile = !!closingBehavior && !!backButton && predMobile && !isDesktop;
        
        return isTgMobile;
    }, []);

    const goBack = () => {
        const backRoute = setRoutes.at(-1);

        if(backRoute === undefined || !backRoute) return;

        navigate(backRoute);
        dispatch(dellRoute());
    };

    const closeWindow = (): void => setOpen(true);

    const handleFullScreen = async (): Promise<void> => {
        try {
            if (viewport.isFullscreen()) {
                if (viewport.exitFullscreen.isAvailable()) {
                    await viewport.exitFullscreen();
                } else {
                    infoAlert(
                        dispatch,
                        'Выход из полноэкранного режима не поддерживается'
                    );
                }
            } else {
                if (viewport.requestFullscreen.isAvailable()) {
                    await viewport.requestFullscreen();
                } else {
                    infoAlert(
                        dispatch,
                        'Вход в полноэкранный режим не поддерживается'
                    );
                }
            }
        } catch (error) {
            warningAlert(
                dispatch,
                'Ошибка при изменении полноэкранного режима'
            );
        }
    };

    useEffect(() => {
        if (!isTgMobile) return;

        if (closingBehavior.mount.isAvailable()) closingBehavior.mount();
        if (backButton.mount.isAvailable()) backButton.mount();
        if (closingBehavior.enableConfirmation.isAvailable()) closingBehavior.enableConfirmation();
    }, [])

    useEffect(() => {
        if (!isTgMobile) return;

        !!setRoutes.length && backButton.show.isAvailable() && backButton.show();
        !setRoutes.length && backButton.hide.isAvailable() && backButton.hide();

        if (backButton.onClick.isAvailable()) {
            const offclick = backButton.onClick(goBack);

            return () => offclick();
        }
    }, [setRoutes]);

    const btnCtx = useMemo(()=> {
        const hasNav = !!setRoutes.length;

        return {
            svg: !!setRoutes.length ? SvgArrowLeft : SvgClose,
            func: !!setRoutes.length ? goBack : closeWindow,
            text: hasNav ? 'Назад' : 'Закрыть',
        }
    }, [setRoutes]);

    if(isTgMobile) return (<></>);

    return (
        <>
            <div className="desc-head-nav">
                <Button
                    className="btn text-fon min rounded"
                    variant="contained"
                    startIcon={ <btnCtx.svg /> }
                    onClick={ btnCtx.func }
                >{btnCtx.text}</Button>
                <Button
                    className="btn text-fon rounded"
                    variant="contained"
                    startIcon={
                        <SvgArrowDown
                            style = {{
                                transform: viewport.isFullscreen() ? '' : 'rotate(180deg)',
                            }}
                        />
                    }
                    endIcon={ <SvgOther /> }
                    onClick={handleFullScreen}
                />
            </div>
            <HeadNavExitDialog
                open={open}
                setOpen={(value: boolean) => setOpen(value)}
            />
        </>
    )
}

export default HeadNav;
