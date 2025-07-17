import { JSX, useState } from 'react';

import Button from '@mui/material/Button';
import DeleteSelfDialog from './Dialog';


const ProfileDelete = (): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => setOpen(true);

    return (
        <>
            <div className="delete-box">
                <h3 className="headline">Удалить анкету</h3>
                <div className="link">
                    <Button
                        className="black"
                        fullWidth
                        variant="contained"
                        loadingPosition="start"
                        disabled={open}
                        onClick={handleOpen}
                    >Удалить</Button>
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
