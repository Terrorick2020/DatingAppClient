import { JSX, memo, useState, useRef } from 'react';
import { PlanLabelSvgType } from '@/types/ui.types';
import { ageToStr } from '@/funcs/general.funcs';
import { useDispatch } from 'react-redux';
import { setLikeTypeBtn } from '@/store/slices/settingsSlice';
import { ELikeBtnType } from '@/types/settings.type';
import type { ISliderItemProps } from '@/types/quest.types';
import type { RootDispatch } from '@/store';

import Button from '@mui/material/Button';
import ScrollBar from '@/components/UI/ScrollBar';
import LikeBtn from '@/components/UI/LikeBtn';
import PlansLabel from '@/components/UI/PlansLabel';
import SvgMapPin from '@/assets/icon/map-pin.svg';


const SliderItem = memo((props: ISliderItemProps): JSX.Element => {
    const [index, setIndex] = useState<number>( 0 );
    const [fade, setFade] = useState<boolean>(true);

    const isReject = useRef<boolean>(false);

    const dispatch = useDispatch<RootDispatch>();

    const disOpt = props.sliderItem.photos.length <= 1;

    const changeImg = (newIndex: number): void => {
        if ( newIndex < 0 ) newIndex = props.sliderItem.photos.length - 1;
        if ( newIndex >= props.sliderItem.photos.length ) newIndex = 0;
        
        setFade(false);
        setTimeout(() => {
            setIndex(newIndex);
            setFade(true);
        }, 200);
    };

    const nextPhoto = () => !disOpt && changeImg( index + 1 );
    const prevPhoto = () => !disOpt && changeImg( index - 1 );

    const onMouseUpDetails = (): void => {
        isReject.current &&
            dispatch(setLikeTypeBtn(ELikeBtnType.Rejected));

        props.toDetails(props.sliderItem.id);
    };

    const onClickLike = (): void => {
        isReject.current = !isReject.current;

        props.clickLike();
    };

   return (
        <div
            className="slide"
            style={{
                backgroundImage: `
                    linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 1) 0%,
                        rgba(0, 0, 0, 0) 10%,
                        rgba(0, 0, 0, 0) 65%,
                        rgba(0, 0, 0, 1) 100%
                    ),
                    url(${ props.sliderItem.photos[index] })
                `,
                opacity: fade ? 1 : 0.35,
            }}
        >
            <nav className="slide__nav">
                <span className="item" onClick={ prevPhoto } />
                <span className="item" onMouseUp={ onMouseUpDetails } />
                <span className="item" onClick={ nextPhoto } />
            </nav>
            <header className="slide__header">
                <ScrollBar len={props.sliderItem.photos.length} index={ index } />
                <div className="labels">
                    <div className="label">
                        <img
                            src={ SvgMapPin }
                            alt="map-pin"
                            loading="lazy"
                            decoding="async"
                        />
                        <p>{ props.sliderItem.city }</p>
                    </div>
                </div>
            </header>
            <footer className="slide__footer">
                <div className="text" onClick={ onMouseUpDetails }>
                    <h4 className="headline">
                        <span className="name">{ `${props.sliderItem.name}, ` }</span>
                        <span className="age">{ ageToStr(props.sliderItem.age) }</span>
                    </h4>
                </div>
                <div className="panel">
                    <PlansLabel type={ PlanLabelSvgType.ordinary }/>
                    <p className="text">{ props.sliderItem.plans.content }</p>
                </div>
                <div className="btns">
                    <Button
                        className="lemon-fon"
                        variant="contained"
                        disabled={props.btnsDis}
                        onClick={ props.prevStep }
                    >Назад</Button>
                    <LikeBtn id={ props.sliderItem.id } clickLike={ onClickLike } />
                    <Button
                        className="lemon"
                        variant="contained"
                        disabled={props.btnsDis}
                        onClick={ props.nextStep }
                    >Далее</Button>
                </div>
            </footer>
        </div>
   )
})

export default SliderItem;
