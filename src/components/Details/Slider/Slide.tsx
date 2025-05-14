import { JSX, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComplOpen } from '@/store/slices/settingsSlice';
import { ageToStr } from '@/funcs/general.funcs';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ScrollBar from '@/components/UI/ScrollBar';
import Button from '@mui/material/Button';
import SvgMapPin from '@/assets/icon/map-pin.svg';
import SvgBlock from '@/assets/icon/block.svg?react';


interface PropsDetailsSlide {
    toLeftScroll: () => void
    toRightScroll: () => void
    len:     number
    index:   number
}
const DetailsSlide = memo((props: PropsDetailsSlide): JSX.Element => {
    const targetUser = useSelector((state: IState) => state.questionnaires.targetUser);

    if(!targetUser) return (<></>);

    const dispatch = useDispatch<RootDispatch>();

    const handleComplaint = () => dispatch(setComplOpen(true));

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
                        >{ targetUser.city }</Button>
                        <Button
                            className="nav-btn icon-btn"
                            variant="contained"
                            onClick={handleComplaint}
                        >
                            <SvgBlock />
                        </Button>
                    </nav>
                </header>
                <main>
                    <span onClick={props.toLeftScroll}></span>
                    <span onClick={props.toRightScroll}></span>
                </main>
                <footer>
                    <h4 className="headline">
                        {`${targetUser.name}, ${ageToStr(targetUser.age)}`}
                    </h4>
                </footer>
            </div>
        </>
    )
})

export default DetailsSlide;
