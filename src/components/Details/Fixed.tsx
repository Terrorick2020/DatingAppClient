import { JSX, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { toSlider } from '@/config/routes.config';
import { useDispatch, useSelector } from 'react-redux';
import { dellRoute } from '@/store/slices/settingsSlice';
import { ELikeBtnType } from '@/types/settings.type';
import type { PropsDetailsFixed } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import LikeBtn from '@/components/UI/LikeBtn';
import Button from '@mui/material/Button';


const DetailsFixed = (props: PropsDetailsFixed): JSX.Element => {
    const likeBtnType = useSelector((state: IState) => state.settings.likeBtnType);

    const dispatch = useDispatch<RootDispatch>();

    const handleRoute = () => dispatch(dellRoute());

    const [isReject, isNoneLikeBtn] = useMemo(
        () => [
            likeBtnType === ELikeBtnType.Rejected,
            likeBtnType === ELikeBtnType.ToChat,
        ],
        [likeBtnType]
    );

    return (
        <>
            <div className="btns">
                <NavLink to={ toSlider } onClick={ handleRoute }>
                    <Button
                        className="lemon-fon bg-dark"
                        variant="contained"
                    >К анкетам</Button>
                </NavLink>
                {
                    !isNoneLikeBtn && <LikeBtn
                        id={ props.id }
                        isReject={ isReject }
                    />
                }
            </div>
            <div className="void"></div>
        </>
    )
}

export default DetailsFixed;
