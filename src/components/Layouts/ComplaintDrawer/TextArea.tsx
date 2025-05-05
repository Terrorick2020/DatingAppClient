import { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendComplaintAsync } from '@/store/slices/settingsSlice';
import { setComplaint } from '@/store/slices/settingsSlice';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const ComplaintDrawerTxtArea = () => {
    const complaint = useSelector((state: IState) => state.settings.complaint);

    const [isLoad, setIsLoad] = useState<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(setComplaint({
            ...complaint,
            query: event.target.value,
        }));
    };

    const handleSend = async (): Promise<void> => {
        setIsLoad(true);
        await dispatch(sendComplaintAsync());
        setIsLoad(false);
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
                    value={complaint.query}
                    onChange={handleChange}
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
