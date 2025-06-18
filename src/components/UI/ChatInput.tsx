import {
    JSX,
    memo,
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useState,
    useEffect,
} from 'react';

import { EPopOrigHor } from '@/types/ui.types';
import type { PropsChatInput, EmojiData } from '@/types/ui.types';

import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import InputAdornment from '@mui/material/InputAdornment';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import IconButton from '@mui/joy/IconButton';
import SvgSend from '@/assets/icon/send.svg';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import ru from '@emoji-mart/data/i18n/ru.json';


const ChatInput = memo((props: PropsChatInput): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [emojiCount, setEmojiCount] = useState<number>(9);
    const [origHor, setOrigHor] = useState<EPopOrigHor>(EPopOrigHor.Right);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = (): void => {
        setAnchorEl(null);
    };

    const handleEmojiSelect = (emoji: EmojiData): void => {
        const newMsg = props.message + emoji.native;
        props.handleChange(newMsg);
    };

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

    const handleResize = (): void => {
        if(window.innerWidth < 400) {
            setEmojiCount(6);
            setOrigHor(EPopOrigHor.Center);
        };
    };

    useEffect(() => {
        if(window.innerWidth < 400) {
            setEmojiCount(6);
            setOrigHor(EPopOrigHor.Right);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                                    id={id}
                                    onClick={handlePopoverOpen}
                                >
                                    <SentimentSatisfiedAltIcon />
                                </IconButton>
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
            <Popover
                id={id}
                className="emoji"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: origHor,
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Picker
                    theme="dark"
                    data={data}
                    locale="en"
                    i18n={ru}
                    onEmojiSelect={handleEmojiSelect}
                    perLine={emojiCount}
                />
            </Popover>
        </div>
    )
})

export default ChatInput;
