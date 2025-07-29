import { JSX, memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setPlanMeta } from '@/store/slices/profileSlice';
import { formatTimeLeft } from '@/funcs/general.funcs';
import { createSelector } from 'reselect';
import type { PropsProfileInfo, PlansLabelsState } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SvgCalendar from '@/assets/icon/calendar.svg';


const selectSettings = (state: IState) => state.settings;
const selectProfile = (state: IState) => state.profile;

const selectProfilePlans = createSelector(
    [selectSettings, selectProfile],
    (settings, profile) => ({
      eveningPlans: profile.eveningPlans,
      plansVars: settings.plansVars,
      districtsVars: settings.districtsVars,
    })
);

const ProfilePlans = memo((props: PropsProfileInfo): JSX.Element => {
    const { eveningPlans, plansVars, districtsVars } = useSelector(selectProfilePlans);

    const [plans, setPlans] = useState<PlansLabelsState>({
        plan: '',
        location: '',
    });

    const dispatch = useDispatch<RootDispatch>();

    const initLabels = (): void => {
        const targetPlan = plansVars.find(
            item => item.value === eveningPlans.plan.value
        );

        const targetLocation = districtsVars.find(
            item => item.value === eveningPlans.location.value
        );

        setPlans({
            plan: targetPlan?.label || 'Не определено',
            location: targetLocation?.label || 'Не определено',
        })
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if(!eveningPlans.isCurrent) return;

            const isCurrent = !!eveningPlans.remains && eveningPlans.remains > 0;
            const remains = isCurrent && eveningPlans.remains ? eveningPlans.remains - 1 : null;

            dispatch(setPlanMeta({ isCurrent, remains }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {initLabels()}, [plansVars])

    return (
        <div className="plans-box">
            <div className="title">
                <h4 className="headline">Планы на сегодня</h4>
                <Chip
                    className={ eveningPlans.isCurrent ? 'purple' : 'black' }
                    label={formatTimeLeft(eveningPlans.remains || 0)}
                />
            </div>
            {
                eveningPlans.isCurrent && <div className="plans">
                    <div className="chips">
                        <Chip className="blure" label={plans.plan || 'Не определено'} />
                        <Chip className="blure" label={plans.location || 'Не определено'}/>
                    </div>
                    <p className="description">Локация: {eveningPlans.location.description || 'Не определено'}</p>
                    <p className="description">Планы: {eveningPlans.plan.description || 'Не определено'}</p>
                </div>
            }
            <Button
                fullWidth
                className="lemon base-height edit with-icon"
                variant="contained"
                startIcon={
                    <img
                        src={SvgCalendar}
                        alt="edit"
                        loading="lazy"
                        decoding="async"
                    />
                }
                onClick={props.handleRoute}
            >Обновить планы</Button>
        </div>
    )
})

export default ProfilePlans;