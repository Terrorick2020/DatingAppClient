import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';


const PlansVars = () => {
    return (
        <>
            <div className="vars">
                <h4 className="headline">Ваши планы на сегодня</h4>
                <ToggleButtonGroup
                        className="select"
                        id="select-plan"
                        spacing={5}
                    >
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                        <IconButton className="select__item">fdfbdfb</IconButton>
                </ToggleButtonGroup>
            </div>
        </>
    )
}

export default PlansVars;
