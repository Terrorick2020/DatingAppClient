import { PlanLabelSvgType } from '@/types/ui.types';

import SvgCheckMark from '@/assets/icon/check-mark.svg';
import SvgBracketCheck from '@/assets/icon/bracket-check.svg';


interface PropsPlansLabel {
    type: PlanLabelSvgType
}

const planLabelStyle = {
    [PlanLabelSvgType.ordinary]: {
        img: SvgCheckMark,
        style: {
            backgroundColor: '#BC96FF',
        },
    },
    [PlanLabelSvgType.success]: {
        img: SvgCheckMark,
        style: {
            backgroundColor: '#D7FF81',
        },
    },
    [PlanLabelSvgType.error]: {
        img: SvgBracketCheck,
        style: {
            backgroundColor: '#FFFFFF',
            opacity: 0.5,
        },
    },
}

const PlansLabel = (props: PropsPlansLabel) => {

    return (
        <>
            <div
                className="plans-label"
                style={{
                    ...planLabelStyle[ props.type ].style
                }}
            >
                <p className="text">Планы на сегодня</p>
                <img src={ planLabelStyle[ props.type ].img } alt="check-mark" />
            </div>
        </>
    )
}

export default PlansLabel;
