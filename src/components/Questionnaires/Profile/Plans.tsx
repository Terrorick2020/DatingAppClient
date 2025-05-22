import { JSX, memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { formatTimeLeft } from '@/funcs/general.funcs';
import type { PropsProfileInfo } from '@/types/quest.types';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SvgCalendar from '@/assets/icon/calendar.svg';


const initialTimeInSeconds = 24 * 60 * 60;

const ProfilePlans = memo((props: PropsProfileInfo): JSX.Element => {
    const eveningPlans = useSelector((state: IState) => state.profile.eveningPlans)

    const [timeLeft, setTimeLeft] = useState<number>(initialTimeInSeconds);

    useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="plans-box">
            <div className="title">
                <h4 className="headline">Планы на сегодня</h4>
                <Chip className={ !timeLeft ? 'black' : 'purple'} label={formatTimeLeft(timeLeft)}/>
            </div>
            <div className="plans">
                <div className="chips">
                    <Chip className="blure" label={eveningPlans.plan.value || 'Не определено'} />
                    <Chip className="blure" label={eveningPlans.location.value || 'Не определено'}/>
                </div>
                <p className="description">{eveningPlans.plan.description || 'Не определено'}</p>
            </div>
            <Button
                fullWidth
                className="lemon base-height edit"
                variant="contained"
                startIcon={<img src={SvgCalendar} alt="edit" />}
                onClick={props.handleRoute}
            >Обновить планы</Button>
        </div>
    )
})

export default ProfilePlans;