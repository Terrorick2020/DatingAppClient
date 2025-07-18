import {
    JSX,
    memo,
    useState,
    useEffect,
    useMemo,
    MouseEvent,
} from 'react';

import {
    ERejectLikingType,
    type PropsLikesCard,
    type LikesCardIsLoading,
} from '@/types/likes.types';

import { useNavigate, useLocation } from 'react-router-dom';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';
import { ageToStr, formatTimeLeftOther } from '@/funcs/general.funcs';
import { useDispatch } from 'react-redux';
import { deleteById } from '@/store/slices/likesSlice';
import { acceptLikingAsync, rejectLikingAsync } from '@/store/slices/likesSlice';
import type { RootDispatch } from '@/store';

import Timer from '@/components/UI/Timer';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgHeart from '@/assets/icon/heart-white.svg?react';
import CircularProgress from '@mui/material/CircularProgress';


const LikesCard= memo((props: PropsLikesCard): JSX.Element => {
    const [timeLeft, setTimeLeft] = useState<number>(props.likesItem.timer.value);
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

    useEffect(() => {
        if (timeLeft === 0) {
            dispatch(deleteById(props.likesItem.id));
        }
    }, [timeLeft]);

    const acceptLiking = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.stopPropagation();

        setIsLoading(prev => ({ ...prev, accept: true }));

        const response = await dispatch(acceptLikingAsync(props.likesItem.id)).unwrap();

        if(response && response !== 'error') {
            dispatch(deleteById(props.likesItem.id));
        };

        setIsLoading(prev => ({ ...prev, accept: false }));
    }

    const rejectLiking = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.stopPropagation();

        setIsLoading(prev => ({ ...prev, reject: true }));

        const response =  await dispatch(rejectLikingAsync({
            id: props.likesItem.id,
            type: ERejectLikingType.Reverse,
        })).unwrap();

        if(response && response !== 'error') {
            dispatch(deleteById(props.likesItem.id));
        };

        setIsLoading(prev => ({ ...prev, reject: false }));
    }

    const handleNavToDetails = (): void => {
        if(isDisabled) return;

        const toDetails = appRoutes.details.replace(':id', props.likesItem.id);

        dispatch(addRoute(location.pathname));
        navigate(toDetails);
    }

    return (
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
                            isCritical={props.likesItem.timer.isCritical}
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
                <h5 className="text">
                    <span className="name">{`${props.likesItem.name}, `}</span>
                    <Badge
                        color="secondary"
                        variant="dot"
                        badgeContent="new"
                        invisible={props.likesItem.isRead}
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#FF4365',
                                top: 0,
                                right: 0,
                                scale: 1.2,
                            },
                        }}
                    >
                        <span className="age">{ageToStr(props.likesItem.age)}</span>
                    </Badge>
                </h5>
            </div>
        </div>
    )
})

export default LikesCard;
