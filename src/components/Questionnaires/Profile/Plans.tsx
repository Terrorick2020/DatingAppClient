import type { PropsProfileInfo } from '@/types/quest.types';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SvgCalendar from '@/assets/icon/calendar.svg';


const ProfilePlans = (props: PropsProfileInfo) => {
    
    return (
        <>
            <div className="plans-box">
                <div className="title">
                    <h4 className="headline">Планы на сегодня</h4>
                    <Chip className="purple" label="23 ч. 59 м."/>
                </div>
                <div className="plans">
                    <div className="chips">
                        <Chip className="blure" label="Коктелтный бар"/>
                        <Chip className="blure" label="Адмиралтейский район"/>
                    </div>
                    <p className="description">Хочу сходить в коктейльный бар, выпить пару коктейлей и пообщаться.</p>
                </div>
                <Button
                    fullWidth
                    className="lemon base-height edit"
                    variant="contained"
                    startIcon={<img src={SvgCalendar} alt="edit" />}
                    onClick={props.handleRoute}
                >Обновить планы</Button>
            </div>
        </>
    )
}

export default ProfilePlans;