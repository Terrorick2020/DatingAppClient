import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setComplOpen } from '@/store/slices/settingsSlice';
import { initComplaintsVarsAsync } from '@/store/slices/settingsSlice';
import { EComplaintType } from '@/types/settings.type';
import { type RootDispatch } from '@/store';
import { type IState } from '@/types/store.types';

import ComplaintDrawerList from './List';
import ComplaintDrawerTxtArea from './TextArea';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CircularProgress from '@mui/material/CircularProgress';


const CtxVars = {
    [EComplaintType.Load]: () => {
        return (
            <>
                <div className="loader">
                    <CircularProgress/>
                </div>
            </>
        )
    },
    [EComplaintType.List]: ComplaintDrawerList,
    [EComplaintType.TxtArea]: ComplaintDrawerTxtArea,
}

const СomplaintDrawer = () => {
    const {open, type} = useSelector((state: IState) => state.settings.complaint);

    const dispatch = useDispatch<RootDispatch>();

    useEffect( () => { dispatch(initComplaintsVarsAsync(null)) }, [open] );

    const CurrentComponent = useMemo( () => CtxVars[type], [type] );

    return (
        <>
            <SwipeableDrawer
                className="complaint-drawer"
                anchor="bottom"
                open={open}
                onOpen={() => dispatch(setComplOpen(true))}
                onClose={() => dispatch(setComplOpen(false))}
            >
                <header className="header">
                    <h4 className="headline">Пожаловаться</h4>
                    <p className="text">Это останется между нами</p>
                </header>
                <CurrentComponent />
            </SwipeableDrawer>
        </>
    )
}

export default СomplaintDrawer;
