import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { EApiStatus } from '@/types/settings.type';
import { SNACK_TIMEOUT } from '@/constant/settings';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HeadNav from '@/components/Layouts/HeadNav';
import LogoHeader from '@/components/Layouts/LogoHeader';


const DefaultLayout = memo(() => {
    const apiRes = useSelector((state: IState) => state.settings.apiRes);

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

    const dispatch = useDispatch<RootDispatch>();

    useEffect(() =>{
        showSnackAlert('Hello', apiRes.status, SNACK_TIMEOUT);
    }, [dispatch])

    return (
        <>
            <div className="default-layout">
                <div className="box">
                    <HeadNav />
                    <LogoHeader />
                    <Outlet />
                </div>
            </div>
        </>
    )
})

export default DefaultLayout;
