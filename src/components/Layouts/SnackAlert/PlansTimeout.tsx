import Chip from '@mui/material/Chip';
import SvgHourglass from '@/assets/img/hourglass.png';


const SAPlansTimeout = () => {
    return (
        <>
            <Chip
                className="plans-timeout"
                label="Обновите свои планы"
                icon={
                    <img src={SvgHourglass} alt="hourglass" />
                }
            />
        </>
    )
}

export default SAPlansTimeout;
