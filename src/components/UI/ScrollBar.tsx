interface PropsScrollBar {
    len:   number
    index: number
}

const ScrollBar = (props: PropsScrollBar) => {
    return (
        <>
            <div className="scroll-bar">
                {Array.from({ length: props.len }).map((_, i) => (
                    <span
                        key={i}
                        className={`item ${ i === props.index && 'selected' }`}
                    ></span>
                ))}
            </div>
        </>
    )
}

export default ScrollBar
