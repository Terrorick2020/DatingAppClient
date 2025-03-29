import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '@/config/routes.config';
import { type Questionnaire } from './SliderPoster';

import Button from '@mui/material/Button';
import ScrollBar from '@/components/UI/ScrollBar';
import LikeBtn from '@/components/UI/LikeBtn';

import SvgMapPin from '@/assets/icon/map-pin.svg';
import SvgCheckMark from '@/assets/icon/check-mark.svg';


interface ISliderItemProps {
    questionnaires: Questionnaire
    nextStep: () => void
    clickLike: (id: number) => void
    prevStep: () => void
}

const SliderItem = (props: ISliderItemProps) => {
    const [index, setIndex] = useState<number>( 0 );
    const [fade, setFade] = useState<boolean>(true);

    const navigate = useNavigate();

    const changeImg = (newIndex: number) => {
        if ( newIndex < 0 ) newIndex = props.questionnaires.imgs.length - 1;
        if ( newIndex >= props.questionnaires.imgs.length ) newIndex = 0;
        
        setFade(false);
        setTimeout(() => {
            setIndex(newIndex);
            setFade(true);
        }, 200);
    };

    const nextPhoto = () => changeImg( index + 1 )
    const toDetails = () => navigate( appRoutes.details )
    const prevPhoto = () => changeImg( index - 1 )

   return (
        <>
            <div
                className="slide"
                style={{
                    backgroundImage: `url(${ props.questionnaires.imgs[index] })`,
                    opacity: fade ? 1 : 0.25,
                }}
            >
                <nav className="slide__nav">
                    <span className="item" onClick={ prevPhoto }></span>
                    <span className="item" onClick={ toDetails }></span>
                    <span className="item" onClick={ nextPhoto }></span>
                </nav>
                <header className="slide__header">
                    <ScrollBar len={props.questionnaires.imgs.length} index={index} />
                    <div className="labels">
                        <div className="label">
                            <img src={ SvgMapPin } alt="map-pin" />
                            <p>{ props.questionnaires.location }</p>
                        </div>
                    </div>
                </header>
                <footer className="slide__footer">
                    <div className="text" onClick={ toDetails }>
                        <h4 className="headline">{ props.questionnaires.name }</h4>
                        <p className="description">{ props.questionnaires.description }</p>
                    </div>
                    <div className="panel">
                        <div className="label">
                            <p className="text">{ props.questionnaires.plans.date }</p>
                            <img src={SvgCheckMark} alt="check-mark" />
                        </div>
                        <p className="text">{ props.questionnaires.plans.content }</p>
                    </div>
                    <div className="btns">
                        <Button
                            className="lemon-fon"
                            variant="contained"
                            onClick={ props.prevStep }
                        >
                            Назад
                        </Button>
                        <LikeBtn id={props.questionnaires.id} clickLike={props.clickLike} />
                        <Button
                            className="lemon"
                            variant="contained"
                            onClick={ props.nextStep }
                        >
                            Далее
                        </Button>
                    </div>
                </footer>
            </div>            
        </>
   )
}

export default SliderItem
