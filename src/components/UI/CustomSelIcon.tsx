import SvgMapPin from '@/assets/icon/map-pin.svg?react';


interface PropsCustomSelIcon {
    handleClick: () => void
}
const CustomSelIcon = (props: PropsCustomSelIcon) => {
    return (
        <>
            <div className="custom-sel-icon" id="custom-sel-icon" onClick={props.handleClick}>
                <SvgMapPin />
                <span className="text">
                    Выбрать
                </span>
            </div>
        </>
    )
}

export default CustomSelIcon;
