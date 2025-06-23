import { JSX, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComplOpen } from '@/store/slices/settingsSlice';
import { ageToStr } from '@/funcs/general.funcs';
import type { PropsDetailsSlide } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import ScrollBar from '@/components/UI/ScrollBar';
import Button from '@mui/material/Button';
import SvgMapPin from '@/assets/icon/map-pin.svg';
import SvgBlock from '@/assets/icon/block.svg?react';


const DetailsSlide = memo((props: PropsDetailsSlide): JSX.Element => {
    const targetUser = useSelector((state: IState) => state.questionnaires.targetUser);

    const dispatch = useDispatch<RootDispatch>();

    const handleComplaint = () => dispatch(setComplOpen(true));

    if(!targetUser) return (<></>);

    return (
        <div className="slide__ctx">
            <header>
                <ScrollBar len={props.len} index={props.index} />
                <nav className="nav">
                    <Button
                        className="label"
                        variant="outlined"
                        disabled
                        startIcon={
                            <img
                                src={SvgMapPin}
                                alt="map-pin"
                                loading="lazy"
                                decoding="async"
                            />
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
                <span onClick={props.toLeftScroll} />
                <span onClick={props.toRightScroll} />
            </main>
            <footer>
                <h4 className="headline">
                    {`${targetUser.name}, ${ageToStr(targetUser.age)}`}
                </h4>
            </footer>
        </div>
    )
})

export default DetailsSlide;
