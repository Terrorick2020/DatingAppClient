import { JSX, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendSelfGeoAsync } from '@/store/slices/profileSlice';
import { tgCloudStore } from '@/funcs/tg.funcs';
import { warningAlert } from '@/funcs/alert.funcs';
import { requestGeolocation } from '@/funcs/geo.funcs';
import { ETgCloudeStore } from '@/types/tg.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const GeoConfirmation = (): JSX.Element => {
    const geoEnable = useSelector((state:IState) => state.profile.info.enableGeo);

    const [open, setOpen] = useState<boolean>(false);
    const [load, setLoad] = useState<'accept' | 'reject' | null>(null);

    const dispatch = useDispatch<RootDispatch>();

    const chekTgStore = async (): Promise<void> => {
        if(geoEnable) return;

        const response = await tgCloudStore.get<number>(ETgCloudeStore.NumRejSetGeo);

        if(!response || response < 3) {
            setOpen(true);

            return;
        };
    };

    useEffect(() => { chekTgStore() }, []);

    const handleReject = async (): Promise<void> => {
        setLoad('reject')

        let rejectCount: number = 0;

        const getRes = await tgCloudStore.get<number>(ETgCloudeStore.NumRejSetGeo);

        if(getRes) {
            rejectCount += getRes + 1;
        };

        await tgCloudStore.set<number>(ETgCloudeStore.NumRejSetGeo, rejectCount);

        setLoad(null);
        setOpen(false);
    };

    const handleAccept = async (): Promise<void> => {
        setLoad('accept');

        const geo = await requestGeolocation();

        if(!geo) {
            warningAlert(
                dispatch,
                'Не получилось получить гео! Проверьте интернет соединение',
            );

            setLoad(null);
            setOpen(false);
            return;
        }
        
        const response = await dispatch(sendSelfGeoAsync(geo)).unwrap();

        if(!response || response === 'error') {
            warningAlert(
                dispatch,
                'Не удалось узнать ваш город или он не находится в разрешённом списке!'
            );
        };
        
        setLoad(null);
        setOpen(false);
    };

    return (
        <Modal
            id="geo-modal"
            open={open}
            aria-labelledby="geo-modal-modal-title"
            aria-describedby="geo-modal-modal-description"
        >
            <Box className="geo-modal">
                <h6 className="headline">
                    Разрешить приложению определять Вашу гео-локацию?
                </h6>
                <div className="btns">
                    <Button
                        fullWidth
                        className="btn bad"
                        variant="contained"
                        loadingPosition="start"
                        loading={load === 'reject'}
                        onClick={handleReject}
                    >
                        {load === 'reject' ? 'Загрузка...' : 'Отклонить'}
                    </Button>
                    <Button
                        fullWidth
                        className="btn success"
                        variant="contained"
                        loadingPosition="start"
                        loading={load === 'accept'}
                        onClick={handleAccept}
                    >
                        {load === 'accept' ? 'Загрузка...' : 'Разрешить'}
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default GeoConfirmation;
