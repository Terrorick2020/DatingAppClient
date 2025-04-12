import SvgMapPin from '@/assets/icon/map-pin.svg?react';


const CustomSelIcon = () => {
    return (
        <>
            <div className="custom-sel-icon" id="custom-sel-icon">
                <SvgMapPin />
                <span className="text">
                    Выбрать
                </span>
            </div>
        </>
    )
}

export default CustomSelIcon;
