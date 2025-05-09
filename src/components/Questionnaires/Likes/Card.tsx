import { useState, useEffect } from 'react';
import { ageToStr, formatTimeLeftOther } from '@/funcs/general.funcs';
import type { LikesItem } from '@/types/likes.types';

import Timer from '@/components/UI/Timer';
import Button from '@mui/material/Button';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgHeart from '@/assets/icon/heart-white.svg?react';


const initialTimeInSeconds = 24 * 60 * 60;

interface PropsLikesCard {
    likesItem: LikesItem
}
const LikesCard= (props: PropsLikesCard) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTimeInSeconds);

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

    return (
        <>
            <div className="card">
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
                            >
                                <SvgClose />
                            </Button>
                            <Button
                                size="small"
                                className="card-btn crimson"
                            >
                                <SvgHeart />
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
