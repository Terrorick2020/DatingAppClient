import { planLabelStyle } from '@/constant/ui';
import { type PropsPlansLabel } from '@/types/ui.types';


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
