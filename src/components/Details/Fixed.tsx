import { appRoutes } from '@/config/routes.config';
import { NavLink } from 'react-router-dom';

import LikeBtn from '@/components/UI/LikeBtn';
import Button from '@mui/material/Button';


const DetailsFixed = () => {
    const id = 1;

    const clickLike = (id: number) => {
        const heartHtml = document.getElementById(`heart-${ id }`);
        if ( heartHtml ) heartHtml.style.animation = 'heart-top 1.5s ease-in-out forwards';
        
        setTimeout(() => {
            if ( heartHtml ) heartHtml.style.animation = 'none';
        }, 1500)
    }

    const questionnairesGlobRoute = appRoutes.questionnaires.global;
    const questionnairesSliderRoute = appRoutes.questionnaires.inner.slider;
    const toSlider = `${questionnairesGlobRoute}/${questionnairesSliderRoute}`;

    return (
        <>
            <div className="btns">
                <NavLink to={ toSlider }>
                    <Button
                        className="lemon-fon"
                        variant="contained"
                    >
                        Назад
                    </Button>
                </NavLink>
                <LikeBtn id={id} clickLike={clickLike} />
            </div>
            <div className="void"></div>
        </>
    )
}

export default DetailsFixed
