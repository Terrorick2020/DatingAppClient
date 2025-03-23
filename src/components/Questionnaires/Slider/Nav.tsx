import { NavLink } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';

import Button from '@mui/material/Button';

import SvgTime from '@/assets/icon/time.svg';
import SvgUserAdd from '@/assets/icon/user-add.svg';
import SvgBlock from '@/assets/icon/block.svg';


const SliderNav = () => {
    const regGlobRoute = appRoutes.register.global
    const regEveningPlansRoute = appRoutes.register.inner.eveningPlans
    const toEveningPlans = `${regGlobRoute}/${regEveningPlansRoute}`

    return (
        <>
            <div className="plans">
                <NavLink className="plans__link" to={ toEveningPlans }>
                    <Button
                        className="nav-btn"
                        variant="contained"
                        startIcon={
                            <img src={SvgTime} alt="time" />
                        }
                    >
                        Обновить планы
                    </Button>
                </NavLink>
            </div>
            <div className="widgets">
                <NavLink to={ '' }>
                    <Button className="nav-btn icon-btn" variant="contained">
                        <img src={SvgUserAdd} alt="user-add" />
                    </Button>
                </NavLink>
                <NavLink to={ '' }>
                    <Button className="nav-btn icon-btn" variant="contained">
                        <img src={SvgBlock} alt="block" />
                    </Button>
                </NavLink>
            </div>
        </>
    )
}

export default SliderNav