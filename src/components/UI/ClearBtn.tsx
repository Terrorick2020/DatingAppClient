import { type ClearBtnProps } from '@/types/ui.types';

import SvgClose from '@/assets/icon/close.svg?react';


const ClearBtn = (props: ClearBtnProps) => {
    return (
        <>
            <span className="clear-btn" onClick={props.onClear}>
                <SvgClose />
            </span>
        </>
    )
}

export default ClearBtn;
