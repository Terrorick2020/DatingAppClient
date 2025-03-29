import { useState, ChangeEvent } from 'react';

import TextField from '@mui/material/TextField';


const FillingQuestBio = () => {
    const [bio, setBio] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBio(event.target.value);
    };

    return (
        <>
            <div className="widgets__bio">
                <h4 className="headline">Био <span className="count">{bio.length}/500</span></h4>
                <TextField
                    className="bio-input"
                    id="bio-input"
                    multiline
                    fullWidth
                    minRows={5}
                    maxRows={10}
                    placeholder="Напишите немного о себе, это поможет пользователям лучше понять вас."
                    value={bio}
                    onChange={handleChange}
                    slotProps={{
                        input: {
                            inputProps: {
                                maxLength: 500,
                            },
                        },
                    }}
                />
            </div>
        </>
    )
}

export default FillingQuestBio
