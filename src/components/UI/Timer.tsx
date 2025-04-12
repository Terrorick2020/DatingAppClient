import { type PropsTimer } from "@/types/ui.types"


const Timer = (props: PropsTimer) => {
    return (
        <>
            <span className={`timer ${props.isCritical && 'critical'}`}>
                { props.value }
            </span>
        </>
    )
}

export default Timer;
