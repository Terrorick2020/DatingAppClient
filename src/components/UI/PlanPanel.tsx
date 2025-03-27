import Button from '@mui/material/Button';

import SvgCheckMark from '@/assets/icon/check-mark.svg';
import SvgTimerCircle from '@/assets/icon/timer-circle.svg';


interface PropsPlanPanel {
    content:   string
    isDetails: boolean
}
const PlanPanel = (props: PropsPlanPanel) => {
    return (
        <>
            <div className="plan-panel">
                <Button
                    className={`label ${ !props.isDetails && 'inner' }`}
                    variant="outlined"
                    disabled
                    endIcon={
                        <span className="circle">
                            <img src={SvgCheckMark} alt="check-mark" />
                        </span>  
                    }
                >
                    Планы на сегодня
                </Button>
                {
                    props.isDetails
                        ?
                        <div className="timer">
                            <img src={SvgTimerCircle} alt="timer-circle" />
                            <p className="time">{ props.content }</p>
                        </div>
                        :
                        <p className="text">{ props.content }</p>
                }
                
            </div>      
        </>
    )
}

export default PlanPanel
