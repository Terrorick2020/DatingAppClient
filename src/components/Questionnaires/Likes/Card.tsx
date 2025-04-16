import { PlanLabelSvgType } from '@/types/ui.types';
import { ageToStr } from '@/funcs/general.funcs';
import { type LikesItem } from '@/types/likes.types';

import PlansLabel from '@/components/UI/PlansLabel';
import Timer from '@/components/UI/Timer';


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
                        <div className="label-panel">
                            <PlansLabel type={ PlanLabelSvgType.success } />
                        </div>
                        <div className="time-panel">
                            <Timer
                                value={props.likesItem.timer.value}
                                isCritical={props.likesItem.timer.isCritical}
                            />
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
