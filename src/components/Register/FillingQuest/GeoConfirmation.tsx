import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendSelfGeoAsync } from '@/store/slices/profileSlice';
import { requestGeolocation } from '@/funcs/geo.funcs';
import { type RootDispatch } from '@/store';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


interface GeoConfirmationProps {
    setConfirmation: (value: boolean) => void;
}

const GeoConfirmation = (props: GeoConfirmationProps) => {
    const [open, setOpen] = useState<boolean>(true);
    const [isLoad, setIsLoad] = useState<boolean>(true);

    const dispatch = useDispatch<RootDispatch>();

    const handleBad = (): void => {
        setOpen(false);
        props.setConfirmation(false);
    }
    const handleSuccess = async (): Promise<void> => {
        setIsLoad(true);

        const geo = await requestGeolocation();

        if(!geo) {
            setIsLoad(false);
            return;
        }
        
        await dispatch(sendSelfGeoAsync(geo));
        
        setIsLoad(false);
        props.setConfirmation(true);
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
                            fullWidth
                            className="btn success"
                            variant="contained"
                            loadingPosition="start"
                            loading={isLoad}
                            onClick={handleSuccess}
                        >
                            {isLoad ? 'Разрешить' : 'Загрузка...'}
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default GeoConfirmation;
