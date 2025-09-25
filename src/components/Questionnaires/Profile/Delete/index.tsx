import { JSX, useState } from 'react';
import { handleTechSupport } from '@/funcs/handles.funcs';
import { useDispatch } from 'react-redux';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import DeleteSelfDialog from './Dialog';
import SvgTechSupport from '@/assets/icon/tech-support.svg';


const ProfileDelete = (): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleOpen = (): void => setOpen(true);
    const handleClickTech = (): Promise<void> => handleTechSupport(dispatch);

    return (
        <>
            <div className="delete-box">
                <h3 className="headline">Система</h3>
                <Button
                    className="lemon base-height edit with-icon"
                    fullWidth
                    variant="contained"
                    startIcon={
                        <img
                            src={SvgTechSupport}
                            alt="tech-support"
                            loading="lazy"
                            decoding="async"
                        />
                    }
                    onClick={handleClickTech}
                >Тех. поддержка</Button>
                <div className="link">
                    <Button
                        className="black edit"
                        fullWidth
                        variant="contained"
                        loadingPosition="start"
                        disabled={open}
                        onClick={handleOpen}
                    >Удалить аккаунт</Button>
                </div>
            </div>
            <DeleteSelfDialog
                open={open}
                setOpen={(value: boolean) => setOpen(value)}
            />
        </>
    )
}

export default ProfileDelete;
