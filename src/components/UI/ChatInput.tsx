import {
    JSX,
    memo,
    ChangeEvent,
    KeyboardEvent,
    useCallback
} from 'react';

import type { PropsChatInput } from '@/types/ui.types';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/joy/IconButton';
import SvgSend from '@/assets/icon/send.svg';


const ChatInput = memo((props: PropsChatInput): JSX.Element => {
    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        props.handleChange(newValue);
    }, [props.handleChange]);

    const handleSendMessage = useCallback(() => {
        const resMsg = props.message.trim();

        props.handleChange(resMsg);
        props.handleClick();
    }, [props.message, props.handleChange, props.handleClick]);

    const handleKeyPress = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && handleSendMessage();
    }, [handleSendMessage]);

    const handleFocus = (): void => props.handleFocus();
    const handleBlur  = (): void => props.handleBlur();

    return (
        <div className="chat-input">
            <TextField
                className="chat-text-field"
                id="chat-text-field"
                fullWidth
                placeholder="Сообщение..."
                value={props.message}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyPress}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleSendMessage}
                                    disabled={!props.message}
                                >
                                    <img src={SvgSend} alt="send" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </div>
    )
})

export default ChatInput;
