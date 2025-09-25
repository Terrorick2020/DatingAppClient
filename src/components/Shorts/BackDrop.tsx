import { JSX } from 'react';
import { useSwipeable } from 'react-swipeable';

import SvgArrowLine from '@/assets/icon/arrow-line.svg';
import SvgFingerUp from '@/assets/icon/finger-up.svg';
import Backdrop from '@mui/material/Backdrop';


interface PropsShortsBackDrop {
    open: boolean
    setOpen: (value: boolean) => void
}
const ShortsBackDrop = (props: PropsShortsBackDrop): JSX.Element => {
    const handleWheel = (): void => {
        props.setOpen(false);
    };

    const handlers = useSwipeable({
        onSwiped: () => {
            props.setOpen(false);
        },
        trackMouse: true,
        trackTouch: true,
        delta: 10,
    });

    return (
        <Backdrop
            className="back-drop-shorts"
            open={ props.open }
        >
            <div { ...handlers } className="colba" onWheel={handleWheel}>
                <div className="anime">
                    <img
                        className="arrow"
                        alt="arrow"
                        loading="lazy"
                        decoding="async"
                        src={ SvgArrowLine }
                    />
                    <img
                        className="finger"
                        alt="finger"
                        loading="lazy"
                        decoding="async"
                        src={ SvgFingerUp }
                    />
                </div>
                <h6 className="text">Свайпай вверх и вниз, <br/> чтобы листать видео</h6>
            </div>
        </Backdrop>
    )
};

export default ShortsBackDrop;
