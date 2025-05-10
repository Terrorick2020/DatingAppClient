import { useState, useEffect, useMemo, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';
import { ageToStr, formatTimeLeftOther } from '@/funcs/general.funcs';
import { useDispatch } from 'react-redux';
import { acceptLikingAsync, rejectLikingAsync } from '@/store/slices/likesSlice';
import type { LikesItem } from '@/types/likes.types';
import type { RootDispatch } from '@/store';

import Timer from '@/components/UI/Timer';
import Button from '@mui/material/Button';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgHeart from '@/assets/icon/heart-white.svg?react';
import CircularProgress from '@mui/material/CircularProgress';


const initialTimeInSeconds = 24 * 60 * 60;

interface PropsLikesCard {
    likesItem: LikesItem
}
interface LikesCardIsLoading {
    reject: boolean
    accept: boolean
}
const LikesCard= (props: PropsLikesCard) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTimeInSeconds);
    const [isLoadind, setIsLoading] = useState<LikesCardIsLoading>({
        reject: false,
        accept: false,
    });

    const isDisabled = useMemo(() => isLoadind.accept || isLoadind.reject, [isLoadind]);

    const dispatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

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

    const acceptLiking = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.stopPropagation();

        setIsLoading(prev => ({ ...prev, accept: true }));

        await dispatch(acceptLikingAsync(props.likesItem.id));

        setIsLoading(prev => ({ ...prev, accept: false }));
    }

    const rejectLiking = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.stopPropagation();

        setIsLoading(prev => ({ ...prev, reject: true }));

        await dispatch(rejectLikingAsync(props.likesItem.id));

        setIsLoading(prev => ({ ...prev, reject: false }));
    }

    const handleNavToDetails = (): void => {
        if(isDisabled) return;

        const toDetails = appRoutes.details.replace(':id', props.likesItem.id);

        dispatch(addRoute(location.pathname));
        navigate(toDetails);
    }

    return (
        <>
            <div className="card" onClick={handleNavToDetails}>
                <div className="card__content">
                    <div
                        className="substance"
                        style={{
                            backgroundImage: `url(${ props.likesItem.avatar })`,
                        }}
                    >
                        <div className="time-panel">
                            <Timer
                                value={formatTimeLeftOther(timeLeft)}
                                isCritical={timeLeft < 60 * 60 * 5}
                            />
                        </div>
                        <div className="btns-panel">
                            <Button
                                size="small"
                                className="card-btn indigo"
                                disabled={isDisabled}
                                onClick={rejectLiking}
                            >
                                {
                                    isLoadind.reject
                                        ?
                                        <CircularProgress />
                                        :
                                        <SvgClose />
                                }
                            </Button>
                            <Button
                                size="small"
                                className="card-btn crimson"
                                disabled={isDisabled}
                                onClick={acceptLiking}
                            >
                                {
                                    isLoadind.accept
                                        ?
                                        <CircularProgress />
                                        :
                                        <SvgHeart />
                                }
                            </Button>
                        </div>
                    </div>
                    <h5 className="name">
                        {`${props.likesItem.name}, ${ageToStr(props.likesItem.age)}`}
                    </h5>
                </div>
            </div>
        </>
    )
}

export default LikesCard;
