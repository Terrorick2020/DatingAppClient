import { JSX } from 'react';
import { appRoutes } from '@/config/routes.config';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dellRoute } from '@/store/slices/settingsSlice';

import LikeBtn from '@/components/UI/LikeBtn';
import Button from '@mui/material/Button';


const ID = 1;

const DetailsFixed = (): JSX.Element => {
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

    const dispatch = useDispatch();

    const handleRoute = () => dispatch(dellRoute());

    return (
        <>
            <div className="btns">
                <NavLink to={ toSlider } onClick={ handleRoute }>
                    <Button
                        className="lemon-fon bg-dark"
                        variant="contained"
                    >
                        Назад
                    </Button>
                </NavLink>
                <LikeBtn id={ID} clickLike={clickLike} />
            </div>
            <div className="void"></div>
        </>
    )
}

export default DetailsFixed;
