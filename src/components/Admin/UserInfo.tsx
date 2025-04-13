import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatch } from '@/store';
import { getProfileByIdAsync, serchProfileStatusAsync } from '@/store/slices/adminSlice';
import { statusTextMap } from '@/constant/admin';
import { EProfileStatus } from '@/types/store.types';
import { ageToStr } from '@/funcs/general.funcs';
import type { IState } from '@/types/store.types';

import Button from '@mui/material/Button';
import Photos from '@/components/UI/Photos';
import BackDropLoading from '@/components/UI/BackDropLoading';
import SvgMapPin from '@/assets/icon/map-pin.svg?react';


const UserInfoContent = () => {
    const targetProfile = useSelector((state: IState) => state.admin.targetProfile);

    const [visit, setVisit] = useState<boolean>(false);

    const { id } = useParams();
    const dispatch = useDispatch<RootDispatch>();

    useEffect(
        () => {
            const logoHeader = document.getElementById('logo-header');
            if( logoHeader ) logoHeader.style.display = 'flex';

            const firstVisit = async (): Promise<void> => {
                id && await dispatch(getProfileByIdAsync(id));
                setVisit(true);
            };

            firstVisit();
        },
        []
    )

    const { text, status, addClass } = statusTextMap[targetProfile.status];
    const isPro = targetProfile.status === EProfileStatus.Pro;
    const isBlocked = targetProfile.status === EProfileStatus.Blocked;

    const handleClick = async (targetValue: EProfileStatus): Promise<void> => {
        await dispatch(serchProfileStatusAsync({
            id: targetProfile.id, 
            targetValue,
        }));
    }

    return (
        <>
            <div className="user-info__ctx">
                <h3 className="headline">{`ID${targetProfile.id}`}</h3>
                <Photos />
                {
                    visit && <div className="description">
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
                }
            </div>
            <div className="user-info__btns">
                <div className="link"> 
                    <Button
                        className="link__btn block"
                        variant="contained"
                        disabled={isBlocked}
                        onClick={() => handleClick(EProfileStatus.Blocked)}
                    >Заблокировать</Button>
                </div>
                <div className="link">
                    {
                        isBlocked
                            ?
                            <Button
                                className="link__btn take-pro"
                                variant="contained"
                                disabled={isPro}
                                onClick={() => handleClick(EProfileStatus.Noob)}
                            >Разблокировать</Button>
                            :
                            <Button
                                className="link__btn take-pro"
                                variant="contained"
                                disabled={isPro}
                                onClick={() => handleClick(EProfileStatus.Pro)}
                            >Сделать Pro</Button>
                    }

                </div>
                <div className="link">
                    <Button
                        className="link__btn take-away-pro"
                        variant="contained"
                        disabled={!isPro}
                        onClick={() => handleClick(EProfileStatus.Noob)}
                    >Убрать Pro</Button>
                </div>
            </div>
            <BackDropLoading />
        </>
    )
}

export default UserInfoContent;
