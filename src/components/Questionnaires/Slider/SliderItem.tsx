import { useState } from 'react';
import { PlanLabelSvgType } from '@/types/ui.types';
import { ageToStr } from '@/funcs/general.funcs';
import { type SliderItem } from '@/types/quest.types';

import Button from '@mui/material/Button';
import ScrollBar from '@/components/UI/ScrollBar';
import LikeBtn from '@/components/UI/LikeBtn';
import PlansLabel from '@/components/UI/PlansLabel';
import SvgMapPin from '@/assets/icon/map-pin.svg';


interface ISliderItemProps {
    sliderItem: SliderItem
    toDetails: (id: string) => void
    nextStep: () => void
    clickLike: (id: number) => void
    prevStep: () => void
}

const SliderItem = (props: ISliderItemProps) => {
    const [index, setIndex] = useState<number>( 0 );
    const [fade, setFade] = useState<boolean>(true);

    const changeImg = (newIndex: number) => {
        if ( newIndex < 0 ) newIndex = props.sliderItem.photos.length - 1;
        if ( newIndex >= props.sliderItem.photos.length ) newIndex = 0;
        
        setFade(false);
        setTimeout(() => {
            setIndex(newIndex);
            setFade(true);
        }, 200);
    };

    const nextPhoto = () => changeImg( index + 1 );
    const prevPhoto = () => changeImg( index - 1 );

   return (
        <>
            <div
                className="slide"
                style={{
                    backgroundImage: `url(${ props.sliderItem.photos[index] })`,
                    opacity: fade ? 1 : 0.25,
                }}
            >
                <nav className="slide__nav">
                    <span className="item" onClick={ prevPhoto }></span>
                    <span className="item" onMouseUp={() => props.toDetails(props.sliderItem.id) }></span>
                    <span className="item" onClick={ nextPhoto }></span>
                </nav>
                <header className="slide__header">
                    <ScrollBar len={props.sliderItem.photos.length} index={index} />
                    <div className="labels">
                        <div className="label">
                            <img src={ SvgMapPin } alt="map-pin" />
                            <p>{ props.sliderItem.city }</p>
                        </div>
                    </div>
                </header>
                <footer className="slide__footer">
                    <div className="text" onClick={() => props.toDetails(props.sliderItem.id) }>
                        <h4 className="headline">
                            {`${props.sliderItem.name}, ${ageToStr(props.sliderItem.age)}`}
                        </h4>
                        <p className="description">{ props.sliderItem.description }</p>
                    </div>
                    <div className="panel">
                        <PlansLabel type={PlanLabelSvgType.ordinary}/>
                        <p className="text">{ props.sliderItem.plans.content }</p>
                    </div>
                    <div className="btns">
                        <Button
                            className="lemon-fon"
                            variant="contained"
                            onClick={ props.prevStep }
                        >Назад</Button>
                        <LikeBtn id={+props.sliderItem.id} clickLike={props.clickLike} />
                        <Button
                            className="lemon"
                            variant="contained"
                            onClick={ props.nextStep }
                        >Далее</Button>
                    </div>
                </footer>
            </div>
        </>
   )
}

export default SliderItem;
