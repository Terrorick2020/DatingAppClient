import { JSX, memo, ChangeEvent, KeyboardEvent } from 'react';
import type { PropsChatInput } from '@/types/ui.types';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/joy/IconButton';
import SvgSend from '@/assets/icon/send.svg';


const ChatInput = memo((props: PropsChatInput): JSX.Element => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        props.handleChange(newValue);
    };

    const handleSendMessage = () => {
        const resMsg = props.message.trim();

        props.handleChange(resMsg);
        props.handleClick();
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && handleSendMessage();
    };

    return (
        <>
            <div className="chat-input">
                <TextField
                    className="chat-text-field"
                    id="chat-text-field"
                    fullWidth
                    placeholder="Сообщение..."
                    value={props.message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSendMessage}>
                                        <img src={SvgSend} alt="send" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>
        </>
    )
})

export default ChatInput;
