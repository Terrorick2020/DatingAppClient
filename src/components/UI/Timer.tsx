import { JSX, memo } from 'react';
import { type PropsTimer } from "@/types/ui.types"


const Timer = memo((props: PropsTimer): JSX.Element => {
    return (
        <>
            <span className={`timer ${props.isCritical && 'critical'}`}>
                { props.value }
            </span>
        </>
    )
})

export default Timer;
