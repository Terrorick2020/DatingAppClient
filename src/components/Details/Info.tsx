import { JSX } from 'react';
import { PlanLabelSvgType } from '@/types/ui.types';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import type { IState } from '@/types/store.types';

import PlansLabel from '@/components/UI/PlansLabel';
import Chip from '@mui/material/Chip';
import SvgTimerCircle from '@/assets/icon/timer-circle.svg';


const selectQuestionnaires = (state: IState) => state.questionnaires;

const selectDetailsInfo = createSelector(
    [selectQuestionnaires],
    (questionnaires) => ({
      plans: questionnaires.targetUser?.plans,
      interest: questionnaires.targetUser?.interest,
      bio: questionnaires.targetUser?.bio,
    })
);

const DetailsInfo = (): JSX.Element => {
    const { plans, interest, bio } = useSelector(selectDetailsInfo);

    if(
        plans === undefined ||
        bio === undefined   ||
        interest === undefined
    ) return (<></>);

    return (
        <>
            <div className="poster">
                <div className="plan-panel">
                    <PlansLabel type={ PlanLabelSvgType.ordinary } />
                    <div className="timer">
                        <img
                            alt="timer-circle"
                            loading="lazy"
                            decoding="async"
                            src={SvgTimerCircle}
                        />
                        {plans.targetTime && <p className="time">{plans.targetTime}</p>}
                    </div>
                </div>
                <div className="labels">
                    <Chip className="blure" label={interest}/>
                    <Chip className="blure" label={plans.place}/>
                    <Chip className="blure" label={plans.district}/>
                </div>
                <div className="text-desc">
                    <p className="text">Описание места: «{plans.distDesc}»</p>
                    <p className="text">Описание планов: «{plans.planDesc}»</p>
                </div>
            </div>
            <div className="description">
                <h4 className="headline">Био</h4>
                <p className="text">{bio}</p>
            </div>
        </>
    )
}

export default DetailsInfo;
