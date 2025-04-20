import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const ComplaintDrawerTxtArea = () => {
    const [isLoad, setIsLoad] = useState<boolean>(false);

    const handleSend = async (): Promise<void> => {
        setIsLoad(true);
    };

    return (
        <>
            <div className="compl-txt-area">
                <TextField
                    id="compl-input"
                    multiline
                    fullWidth
                    minRows={5}
                    maxRows={10}
                    placeholder="Напишите Вашу жалобу"
                    slotProps={{
                        input: {
                            inputProps: {
                                maxLength: 200,
                            },
                        },
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    loadingPosition="start"
                    loading={isLoad}
                    onClick={handleSend}
                >
                    {isLoad ? 'Отправление...' : 'Отправить'}
                </Button>
            </div>
        </>
    )
}

export default ComplaintDrawerTxtArea;
