import SvgClose from '@/assets/icon/close.svg?react'


interface ClearBtnProps {
    onClear: () => void
}

const ClearBtn = ( { onClear }: ClearBtnProps ) => {
    return (
        <>
            <span className="clear-btn" onClick={onClear}>
                <SvgClose />
            </span>
        </>
    )
}

export default ClearBtn
