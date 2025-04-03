import SvgCheckDoubleFill from '@/assets/icon/check-double-fill.svg?react';


export interface PropsChatMsg {
    id: number
    isSelf: boolean
    msg: string
    time: string
    isChecked: boolean
}
const ChatMsg = (props: PropsChatMsg) => {
    return (
        <>
            <div className={`msg  ${props.isSelf && 'self'}`}>
                <div className="msg__ctx">
                    <p className="text">{ props.msg }</p>
                </div>
                <div className="msg__label">
                    <p className="time">{ props.time }</p>
                    <SvgCheckDoubleFill class={props.isChecked && 'checked'} />
                </div>
            </div>
        </>
    )
}

export default ChatMsg;
