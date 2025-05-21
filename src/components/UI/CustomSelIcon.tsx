import { JSX, memo } from 'react';
import type { PropsCustomSelIcon } from '@/types/ui.types';

import SvgMapPin from '@/assets/icon/map-pin.svg?react';


const CustomSelIcon = memo((props: PropsCustomSelIcon): JSX.Element => {
    return (
        <>
            <div className="custom-sel-icon" id="custom-sel-icon" onClick={props.handleClick}>
                <SvgMapPin />
                <span className="text">
                    Выбрать
                </span>
            </div>
        </>
    )
})

export default CustomSelIcon;
