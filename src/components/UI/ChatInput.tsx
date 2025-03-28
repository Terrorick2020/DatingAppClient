import TextField from '@mui/material/TextField';
import IconButton from '@mui/joy/IconButton';
import SvgSend from '@/assets/icon/send.svg';


const ChatInput = () => {
    return (
        <>
            <div className="chat-input">
                <TextField
                    className="chat-text-field"
                    id="chat-text-field"
                    fullWidth
                    placeholder="Сообщение..."
                />
                <IconButton>
                    <img src={SvgSend} alt="send" />
                </IconButton>
            </div>
        </>
    )
}

export default ChatInput
