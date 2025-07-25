import { JSX, memo } from 'react';
import { type PropsScrollBar } from '@/types/ui.types';


const ScrollBar = memo((props: PropsScrollBar): JSX.Element => {
    return (
        <div className="scroll-bar">
            {Array.from({ length: props.len }).map((_, i) => (
                <span
                    key={i}
                    className={`item ${ i === props.index ? 'selected' : '' }`}
                ></span>
            ))}
        </div>
    )
})

export default ScrollBar;
