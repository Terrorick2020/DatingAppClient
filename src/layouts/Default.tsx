import {
    initSocketRoomsConnectAsync,
    initSocketRoomsDisconnectAsync,
} from '@/store/slices/settingsSlice';

import { JSX, memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { EApiStatus } from '@/types/settings.type';
import { SNACK_TIMEOUT } from '@/constant/settings';
import { connectToNamespace, disconnectFromNamespace } from '@/config/socket.config';
import { defNamespaces } from '@/config/socket.config';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HeadNav from '@/components/Layouts/HeadNav';
import LogoHeader from '@/components/Layouts/LogoHeader';


const DefaultLayout = memo((): JSX.Element => {
    const apiRes = useSelector((state: IState) => state.settings.apiRes);

    const dispatch = useDispatch<RootDispatch>();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showSnackAlert = (msg: string, type: EApiStatus, aHDuration: number | null) => {
        enqueueSnackbar(msg, {
            variant: type,
            autoHideDuration: aHDuration,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            action: (key: string | number) => (
                <IconButton className="notify" onClick={() => closeSnackbar(key)}>
                    <CloseRoundedIcon />
                </IconButton>
            )
        })
    }

    useEffect( () => {
        apiRes.value && showSnackAlert(apiRes.msg, apiRes.status, SNACK_TIMEOUT);
    }, [apiRes] );

    const handleSocketConnect = async (): Promise<void> => {
        await Promise.all([
            defNamespaces.map(item => connectToNamespace(item))
        ]);

        await dispatch(initSocketRoomsConnectAsync(defNamespaces));
    };

    const handleSocketDisconnect = async (): Promise<void> => {
        await dispatch(initSocketRoomsDisconnectAsync(defNamespaces));

        await Promise.all([
            defNamespaces.map(item => disconnectFromNamespace(item))
        ]);
    };

    useEffect( () => {
        handleSocketConnect();

        return () => {
            handleSocketDisconnect();
        }
    }, [] );

    return (
        <div className="default-layout">
            <div className="box">
                <HeadNav />
                <LogoHeader />
                <Outlet />
            </div>
        </div>
    )
})

export default DefaultLayout;
