import { JSX } from 'react';
import { PlanLabelSvgType } from '@/types/ui.types';
import { useSelector } from 'react-redux';
import type { IState } from '@/types/store.types';

import PlansLabel from '@/components/UI/PlansLabel';
import Chip from '@mui/material/Chip';
import SvgTimerCircle from '@/assets/icon/timer-circle.svg';


const DetailsInfo = (): JSX.Element => {
    const plans = useSelector((state: IState) => state.questionnaires.targetUser?.plans);
    const bio = useSelector((state: IState) => state.questionnaires.targetUser?.bio);

    return (
        <>
            <div className="poster">
                <div className="plan-panel">
                    <PlansLabel type={ PlanLabelSvgType.ordinary } />
                    <div className="timer">
                        <img src={SvgTimerCircle} alt="timer-circle" />
                        <p className="time">{plans?.targetTime}</p>
                    </div>
                </div>
                <div className="labels">
                    <Chip className="blure" label={plans?.place}/>
                    <Chip className="blure" label={plans?.district}/>
                </div>
                <p className="text">{plans?.description}</p>
            </div>
            <div className="description">
                <h4 className="headline">Био</h4>
                <p className="text">{bio}</p>
            </div>
        </>
    )
}

export default DetailsInfo;
