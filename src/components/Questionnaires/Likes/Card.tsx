import { ageToStr } from '@/funcs/general.funcs';
import type { LikesItem } from '@/types/likes.types';

import Timer from '@/components/UI/Timer';
import Button from '@mui/material/Button';
import SvgClose from '@/assets/icon/close.svg?react';
import SvgHeart from '@/assets/icon/heart-white.svg?react';


interface PropsLikesCard {
    likesItem: LikesItem
}
const LikesCard= (props: PropsLikesCard) => {
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
                                value={props.likesItem.timer.value}
                                isCritical={props.likesItem.timer.isCritical}
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
