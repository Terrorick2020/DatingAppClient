import {
    setComplOpen,
    initComplaintsVarsAsync,
    resetComplaint,
    setComplaint
} from '@/store/slices/settingsSlice';

import { JSX, memo, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EComplaintType, EComplaintStep } from '@/types/settings.type';
import type { PropsComplaintDrawer } from '@/types/ui.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ComplaintDrawerList from './List';
import ComplaintDrawerTxtArea from './TextArea';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CircularProgress from '@mui/material/CircularProgress';


interface ComplaintDrawerCtxVars {
    [EComplaintType.Load]: () => JSX.Element,
    [EComplaintType.Content]: {
        [EComplaintStep.FStep]: () => JSX.Element,
        [EComplaintStep.SStep]: () => JSX.Element,
        [EComplaintStep.TStep]: () => JSX.Element,
    }
}

const CtxVars: ComplaintDrawerCtxVars = {
    [EComplaintType.Load]: () => {
        return (
            <>
                <div className="loader">
                    <CircularProgress/>
                </div>
            </>
        )
    },
    [EComplaintType.Content]: {
        [EComplaintStep.FStep]: ComplaintDrawerList,
        [EComplaintStep.SStep]: ComplaintDrawerList,
        [EComplaintStep.TStep]: ComplaintDrawerTxtArea,
    },
}

const ComplaintDrawer = memo((props: PropsComplaintDrawer): JSX.Element => {
    const complaint = useSelector((state: IState) => state.settings.complaint);

    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            if(complaint.open) {
                dispatch(setComplaint({
                    ...complaint,
                    to: props.id,
                }));

                dispatch(initComplaintsVarsAsync());
            }

            !complaint.open && dispatch(resetComplaint());
        },
        [complaint.open]
    );

    const CurrentComponent = useMemo(
        () => {
            const ctx = CtxVars[complaint.type];

            if( typeof ctx === 'function') return ctx;

            return ctx[complaint.step]
        },
        [complaint.type, complaint.step]
    );

    return (
        <SwipeableDrawer
            className="complaint-drawer"
            anchor="bottom"
            open={complaint.open}
            onOpen={() => dispatch(setComplOpen(true))}
            onClose={() => dispatch(setComplOpen(false))}
        >
            <header className="header">
                <h4 className="headline">Пожаловаться</h4>
                <p className="text">Это останется между нами</p>
            </header>
            <CurrentComponent />
        </SwipeableDrawer>
    )
})

export default ComplaintDrawer;
