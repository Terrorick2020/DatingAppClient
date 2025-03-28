import {
    useState,
    ChangeEvent,
    KeyboardEvent,
    useEffect
} from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/joy/IconButton';
import SvgSend from '@/assets/icon/send.svg';


interface PropsChatInput {
    isMatch: boolean
}

const ChatInput = (props: PropsChatInput) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (!message.trim()) return;
        console.log("Отправка сообщения:", message);
        setMessage('');
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    useEffect(
        () => {
            if ( props.isMatch ) setMessage('Напишите ей');
        },
        []
    )

    return (
        <>
            <div className="chat-input">
                <TextField
                    className="chat-text-field"
                    id="chat-text-field"
                    fullWidth
                    placeholder="Сообщение..."
                    value={message}
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
}

export default ChatInput
