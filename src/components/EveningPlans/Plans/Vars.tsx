import { JSX, memo, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlan } from '@/store/slices/profileSlice';
import type { BaseVarsItem } from '@/types/settings.type';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';


interface PropsPlansVars {
    plansVars: BaseVarsItem[]
}
const PlansVars = memo((props: PropsPlansVars): JSX.Element => {
    const plan = useSelector((state: IState) => state.profile.eveningPlans.plan);

    const dispatch = useDispatch<RootDispatch>();

    const handleOnChangePlan = (_: MouseEvent<HTMLElement>, newValue: string | null): void => {
        console.log( newValue )
        newValue && dispatch(setPlan({
            ...plan,
            value: newValue
        }))
    }

    return (
        <>
            <div className="vars">
                <h4 className="headline">Ваши планы на сегодня</h4>
                <ToggleButtonGroup
                        className="select"
                        id="select-plan"
                        spacing={5}
                        value={plan.value ?? null}
                        onChange={handleOnChangePlan}
                    >
                        {props.plansVars.map(item => (
                            <IconButton
                                key={`plan-item-${item.id}`}
                                className="select__item"
                                value={item.value}
                            >
                                {item.label}
                            </IconButton>
                        ))}
                </ToggleButtonGroup>
            </div>
        </>
    )
})

export default PlansVars;
