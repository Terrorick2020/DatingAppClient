import ScrollBar from '@/components/UI/ScrollBar';
import Button from '@mui/material/Button';

import SvgMapPin from '@/assets/icon/map-pin.svg';
import SvgBlock from '@/assets/icon/block.svg?react';


interface PropsDetailsSlide {
    toLeftScroll: () => void
    toRightScroll: () => void
    len:     number
    index:   number
    content: any
}
const DetailsSlide = (props: PropsDetailsSlide) => {
    return (
        <>
            <div className="slide__ctx">
                <header>
                    <ScrollBar len={props.len} index={props.index} />
                    <nav className="nav">
                        <Button
                            className="label"
                            variant="outlined"
                            disabled
                            startIcon={
                                <img src={SvgMapPin} alt="map-pin" />
                            }
                        >
                            Санкт-Петербург
                        </Button>
                        <Button className="nav-btn icon-btn" variant="contained">
                            <SvgBlock />
                        </Button>
                    </nav>
                </header>
                <main>
                    <span onClick={props.toLeftScroll}></span>
                    <span onClick={props.toRightScroll}></span>
                </main>
                <footer>
                    <h4 className="headline">Виктория, 20 лет</h4>
                </footer>
            </div>
        </>
    )
}

export default DetailsSlide
