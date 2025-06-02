import { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { toSlider } from '@/config/routes.config';
import { useDispatch } from 'react-redux';
import { dellRoute } from '@/store/slices/settingsSlice';
import type { PropsDetailsFixed } from '@/types/quest.types';

import LikeBtn from '@/components/UI/LikeBtn';
import Button from '@mui/material/Button';


const DetailsFixed = (props: PropsDetailsFixed): JSX.Element => {
    const dispatch = useDispatch();

    const handleRoute = () => dispatch(dellRoute());

    return (
        <>
            <div className="btns">
                <NavLink to={ toSlider } onClick={ handleRoute }>
                    <Button
                        className="lemon-fon bg-dark"
                        variant="contained"
                    >Назад</Button>
                </NavLink>
                <LikeBtn id={props.id} />
            </div>
            <div className="void"></div>
        </>
    )
}

export default DetailsFixed;
