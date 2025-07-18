import { JSX, memo } from 'react';
import { planLabelStyle } from '@/constant/ui';
import type { PropsPlansLabel } from '@/types/ui.types';


const PlansLabel = memo((props: PropsPlansLabel): JSX.Element => {
    return (
        <div
            className="plans-label"
            style={{
                ...planLabelStyle[ props.type ].style
            }}
        >
            <p className="text">Планы на сегодня</p>
            <img
                src={ planLabelStyle[ props.type ].img }
                alt="check-mark"
                loading="lazy"
                decoding="async"
            />
        </div>
    )
})

export default PlansLabel;
