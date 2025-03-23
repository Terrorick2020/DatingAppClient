import { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


interface GeoConfirmationProps {
    setConfirmation: (value: boolean) => void;
}

const GeoConfirmation = ({setConfirmation}: GeoConfirmationProps) => {
    const [open, setOpen] = useState(true);

    const handleBad = () => {
        setOpen(false);
        setConfirmation(false);
    }
    const handleSuccess = () => {
        setOpen(false);
        setConfirmation(true);
    }

    return (
        <>
            <Modal
                id="geo-modal"
                open={open}
                aria-labelledby="geo-modal-modal-title"
                aria-describedby="geo-modal-modal-description"
            >
                <Box className="geo-modal">
                    <h6 className="headline">Стандартный диалог с разрешением гео</h6>
                    <div className="btns">
                        <Button
                            className="btn bad"
                            variant="contained"
                            onClick={handleBad}
                        >
                            Отклонить
                        </Button>
                        <Button
                            className="btn success"
                            variant="contained"
                            onClick={handleSuccess}
                        >
                            Разрешить
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default GeoConfirmation
