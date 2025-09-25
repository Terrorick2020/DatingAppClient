import { JSX, useMemo, useEffect, useState } from 'react';
import { closingBehavior, backButton, viewport, isTMA } from '@telegram-apps/sdk';
import { useNavigate  } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { isTgMobile } from '@/funcs/tg.funcs';
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


async function enterFullscreen(): Promise<boolean> {
  if (document.documentElement.requestFullscreen) {
    await document.documentElement.requestFullscreen();
    return !!document.fullscreenElement;
  }
  return false;
}

async function exitFullscreen(): Promise<boolean> {
  if (document.exitFullscreen) {
    await document.exitFullscreen();
    return !document.fullscreenElement;
  }
  return false;
}

const HeadNav = (): JSX.Element => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);

    const [open, setOpen] = useState<boolean>(false);
    const [_, setLoad] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(
        () => viewport.isFullscreen() || !!document.fullscreenElement
    );

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const isTelegramgMobile = useMemo(() => {
        const result = isTgMobile()

        return result;
    }, []);

    const goBack = () => {
        const backRoute = setRoutes.at(-1);

        if(backRoute === undefined || !backRoute) return;

        navigate(backRoute);
        dispatch(dellRoute());
    };

    const closeWindow = (): void => setOpen(true);

    const handleFullScreen = async (): Promise<void> => {
        setLoad(true);

        try {
            if (!(await isTMA())) {
                const ok = isFullscreen
                    ? await exitFullscreen()
                    : await enterFullscreen();

                if (!ok) {
                    infoAlert(
                        dispatch,
                        `${isFullscreen ? 'Выход' : 'Вход'} из полноэкранного режима не поддерживается`
                    );
                }
            } else {
                if (viewport.isFullscreen()) {
                    if (viewport.exitFullscreen.isAvailable()) {
                        await viewport.exitFullscreen();
                    } else {
                        infoAlert(dispatch, 'Выход из полноэкранного режима не поддерживается');
                    }
                } else {
                    if (viewport.requestFullscreen.isAvailable()) {
                        await viewport.requestFullscreen();
                    } else {
                        infoAlert(dispatch, 'Вход в полноэкранный режим не поддерживается');
                    }
                }
            }
        } catch {
            warningAlert(dispatch, 'Ошибка при изменении полноэкранного режима');
        } finally {
            setIsFullscreen(viewport.isFullscreen() || !!document.fullscreenElement);
            setLoad(false);
        }
    };

    useEffect(() => {
        if(isTelegramgMobile) {
            if (closingBehavior.mount.isAvailable()) closingBehavior.mount();
            if (backButton.mount.isAvailable()) backButton.mount();
            if (closingBehavior.enableConfirmation.isAvailable()) closingBehavior.enableConfirmation();

            const topPx = viewport.safeAreaInsetTop();
            document.documentElement.style.setProperty('--box-header-height', `${topPx}px`);
        } else {
            const update = () => {
                setIsFullscreen(viewport.isFullscreen() || !!document.fullscreenElement);
            };

            document.addEventListener('fullscreenchange', update);
            document.addEventListener('webkitfullscreenchange', update);
            document.addEventListener('msfullscreenchange', update);

            return () => {
                document.removeEventListener('fullscreenchange', update);
                document.removeEventListener('webkitfullscreenchange', update);
                document.removeEventListener('msfullscreenchange', update);
            }
        }
    }, []);

    useEffect(() => {
        if (!isTelegramgMobile) return;

        !!setRoutes.length && backButton.show.isAvailable() && backButton.show();
        !setRoutes.length && backButton.hide.isAvailable() && backButton.hide();

        if (backButton.onClick.isAvailable()) {
            const offclick = backButton.onClick(goBack);

            return () => offclick();
        }
    }, [setRoutes]);

    const btnCtx = useMemo(() => {
        const hasNav = !!setRoutes.length;

        return {
            svg: !!setRoutes.length ? SvgArrowLeft : SvgClose,
            func: !!setRoutes.length ? goBack : closeWindow,
            text: hasNav ? 'Назад' : 'Закрыть',
        }
    }, [setRoutes]);

    if(isTelegramgMobile) return (<></>);

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
                                transform: isFullscreen ? '' : 'rotate(180deg)',
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
