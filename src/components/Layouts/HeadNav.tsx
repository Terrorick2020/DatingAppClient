import {
    closingBehavior,
    backButton,
    viewport,
    miniApp,
    isTMA,
    popup,
} from '@telegram-apps/sdk';

import { JSX, useMemo, useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { dellRoute } from '@/store/slices/settingsSlice';
import { warningAlert, infoAlert } from '@/funcs/alert.funcs';
import { useSelector, useDispatch } from 'react-redux';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SvgArrowDown from '@/assets/icon/arrow-down.svg?react';
import SvgArrowLeft from '@/assets/icon/arrow-left.svg?react';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgOther from '@/assets/icon/other.svg?react';


const DesktopHeadNav = (): JSX.Element => {
    const setRoutes = useSelector((state: IState) => state.settings.routes);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [fullTxt, setFullTxt] = useState<string>('Свернуть приложение');

    const navigate = useNavigate();
    const dispatch = useDispatch<RootDispatch>();

    const open = Boolean(anchorEl);
    const id = open ? 'nav-menu' : undefined;
    const userAgent = navigator.userAgent.toLowerCase();

    const isTgMobile = useMemo(() => {
        const predDesktop = userAgent.includes('windows') || userAgent.includes('macintosh') || userAgent.includes('win');
        const predMobile  = userAgent.includes('iphone') || userAgent.includes('android');

        const isDesktop  = !predMobile || predDesktop;
        const isTgMobile = !!closingBehavior && !!backButton && predMobile && !isDesktop;
        
        return isTgMobile;
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (): void => {
        setAnchorEl(null);
    };

    const goBack = () => {
        const backRoute = setRoutes.at(-1);

        if(backRoute === undefined || !backRoute) return;

        navigate(backRoute);
        dispatch(dellRoute());
    };

    const closeWindow = async (): Promise<void> => {
        const isTg = await isTMA();

        if(isTg && miniApp.mountSync.isAvailable()) {
            miniApp.mountSync();

            const response = await popup.open({
                title: 'Завешение работы',
                message: 'Вы уверены, что хотите закрыть приложение?',
                buttons: [
                    { id: 'cancellation', type: 'default', text: 'Отмена' },
                    { id: 'close', type: 'destructive', text: 'Закрыть' }
                ],
            });

            if (response && response === 'close') {
                miniApp.close.isAvailable() && miniApp.close();
            }
        } else {
            window.close();
        }
    };

    const handleFullScreen = async (): Promise<void> => {
        try {
            if (viewport.isFullscreen()) {
                if (viewport.exitFullscreen.isAvailable()) {
                    await viewport.exitFullscreen();
                    setFullTxt('Развернуть приложение');
                } else {
                    infoAlert(
                        dispatch,
                        'Выход из полноэкранного режима не поддерживается'
                    );
                }
            } else {
                if (viewport.requestFullscreen.isAvailable()) {
                    await viewport.requestFullscreen();

                    setFullTxt('Свернуть приложение');
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
        } finally {
            handleMenuClose();
        }
    };

    const handleGetPolicy = (): void => {
        handleMenuClose();
    };

    const handleDeleteProfile = (): void => {
        handleMenuClose();
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
        <div className="desc-head-nav">
            <Button
                className="btn text-fon min rounded"
                variant="contained"
                startIcon={ <btnCtx.svg /> }
                onClick={ btnCtx.func }
            >{btnCtx.text}</Button>
            <Button
                id={id}
                className="btn text-fon rounded"
                variant="contained"
                startIcon={ <SvgArrowDown /> }
                endIcon={ <SvgOther /> }
                onClick={handleMenuOpen}
            />
            <Menu
                id={id}
                className="serch-menu nav-menu"
                anchorEl={anchorEl}
                open={open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleFullScreen}>
                    <SvgArrowDown 
                        style={{
                            transform:  viewport.isFullscreen() ? '' : 'rotate(180deg)'
                        }}
                    />
                    <span className="text">{ fullTxt }</span>
                </MenuItem>
                <MenuItem onClick={handleGetPolicy}>
                    <AssignmentIcon />
                    <span className="text">Политика приложения</span>
                </MenuItem>
                <MenuItem onClick={handleDeleteProfile}>
                    <DeleteOutlineIcon />
                    <span className="text">Удалить аккаунт</span>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default DesktopHeadNav;
