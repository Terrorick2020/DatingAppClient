import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatch } from '@/store';
import { getProfileByIdAsync } from '@/store/slices/adminSlice';
import { statusTextMap } from '@/constant/admin';
import { ageToStr } from '@/funcs/general.funcs';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import Photos from '@/components/UI/Photos';
import SvgMapPin from '@/assets/icon/map-pin.svg?react';


const UserInfoContent = () => {
    const targetProfile = useSelector((state: IState) => state.admin.targetProfile);

    const { id } = useParams();
    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const langHtml = document.getElementById('user-info');
            if ( langHtml ) langHtml.style.animation = 'fadeIn 1s ease-in-out forwards';

            id && dispatch(getProfileByIdAsync(id));
        },
        []
    )

    const { text, status, addClass } = statusTextMap[targetProfile.status];

    return (
        <>
            <div className="user-info__ctx">
                <h3 className="headline">{`ID${targetProfile.id}`}</h3>
                <Photos />
                <div className="description">
                    <h4 className="headline">
                        {`${targetProfile.name}, ${ageToStr(targetProfile.age)}`}
                    </h4>
                    <div className="labels">
                        <div className="item">
                            <SvgMapPin />
                            <p className="text">{targetProfile.city}</p>
                        </div>
                        <div className={`item ${addClass}`}>
                            <p className="text">{text}<span>{status}</span></p>
                        </div>
                    </div>
                    <p className="info">{targetProfile.description}</p>
                </div>
            </div>
            <div className="user-info__btns">
                <div className="link">
                    <Button className="link__btn block" variant="contained">Заблокировать</Button>
                </div>
                <div className="link">
                    <Button className="link__btn take-pro" variant="contained">Сделать Pro</Button>
                </div>
                <div className="link">
                    <Button className="link__btn take-away-pro" variant="contained">Убрать Pro</Button>
                </div>
            </div>
        </>
    )
}

export default UserInfoContent;
