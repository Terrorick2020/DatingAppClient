import { JSX, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { NavLink } from 'react-router-dom';
import { toProfile } from '@/config/routes.config';
import { useDispatch, useSelector } from 'react-redux';
import { initSliderListAsync } from '@/store/slices/questionnairesSlice';
import { initialArgs } from '@/constant/quest';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';
import type { InitSliderData } from '@/types/quest.types';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';

import SliderItem from './SliderItem';
import Button from '@mui/material/Button';
import SvgQuestsEmpty from '@/assets/icon/quests-empty.svg';


const SliderPoster = (): JSX.Element => {
  const sliderList = useSelector((state: IState) => state.questionnaires.sliderList);

  const [index, setIndex] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isSwiped, setIsSwiped] = useState<boolean>(false);

  const block = useRef<InitSliderData>(initialArgs);
  const isDopLoad = useRef<boolean>(false);

  const disOpt = sliderList.length <= 1;

  const changeSlide = (newIndex: number) => {
    if(disOpt) return;

    if (newIndex < 0) newIndex = sliderList.length - 1;
    if (newIndex >= sliderList.length) newIndex = 0;
    
    setIndex(newIndex);
    setOffset(0);
    setIsSwiped(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if(disOpt) return;

      changeSlide(index + 1);
      Math.abs(offset) < 5 && setIsSwiped(true);
    },
    onSwipedRight: () => {
      if(disOpt) return;

      changeSlide(index - 1);
      Math.abs(offset) < 5 && setIsSwiped(true);
    },
    onSwipedUp: () => {
      if(disOpt) return;

      if( offset < -50 ) changeSlide(index - 1);
      if( offset > 50 ) changeSlide(index - 1);
    },
    onSwipedDown: () => {
      if(disOpt) return;

      if( offset < -50 ) changeSlide(index - 1);
      if( offset > 50 ) changeSlide(index - 1);
    },
    onSwiping: (eventData) => {
      if(disOpt) return;

      setOffset(eventData.deltaX)
    },
    trackMouse: true,
  });

  const nextStep = (): void => {
    changeSlide(index + 1);
  }

  const prevStep = (): void => changeSlide(index - 1);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<RootDispatch>();

  const toDetails = (id: string): void => {
    const toDetails = appRoutes.details.replace(':id', id);

    setTimeout(() => {
      !isSwiped && Math.abs(offset) < 5 && navigate(toDetails);
      dispatch(addRoute(location.pathname));
    }, 100); 
  }

  const handleDopLoad = async (): Promise<void> => {
    if(sliderList.length % initialArgs.limit !== 0) return;

    const buffer = 4;
    const shouldLoadMore = sliderList.length > 0 && index >= sliderList.length - buffer;

    if (!shouldLoadMore || isDopLoad.current) return;

    isDopLoad.current = true;

    const newData: InitSliderData = {
      limit: block.current.limit,
      offset: block.current.offset + initialArgs.offset,
    };

    const response = await dispatch(initSliderListAsync(newData)).unwrap();

    if (response && response !== 'error') {
      block.current = newData;
    }

    isDopLoad.current = false;
  };

  useEffect(() => {
    handleDopLoad();
  }, [index]);

  if(!sliderList.length) return (
    <div className="empty">
      <img src={SvgQuestsEmpty} alt="quests-empty" />
      <h4 className="headline">В вашем городе ещё никого нет!</h4>
      <p className="text">Попробуйте изменить настройки профиля</p>
      <NavLink className="link" to={ toProfile }>
        <Button variant="contained">Изменить настройки</Button>
      </NavLink>
    </div>
  )

  return (
    <div className="poster__ctx">
      <div {...handlers} className="carousel-container">
        <div
          className="carousel-track"
          style={{
            width: `calc(${sliderList.length * 100}% + ${(sliderList.length - 1) * 16}px)`,
            transform: `translateX(calc(${-index * 100}% - ${index * 16}px + ${offset}px))`,
            transition: offset === 0 ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {sliderList.map( item => (
            <div
              className="carousel-slide"
              key={`slider-item-${item.id}`}
              style={{
                transform: `rotateY(${-Math.min(10, Math.max(-20, offset / 10))}deg)`
              }}
            >
              <SliderItem 
                sliderItem={item}
                toDetails={toDetails}
                nextStep={nextStep}
                clickLike={nextStep}
                prevStep={prevStep}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderPoster;
