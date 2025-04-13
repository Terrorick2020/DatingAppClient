import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { useDispatch } from 'react-redux';
import { addRoute } from '@/store/slices/settingsSlice';
import { appRoutes } from '@/config/routes.config';

import SliderItem from './SliderItem';

import PngLeady from '@/assets/img/leady.png';
import PngWoman from '@/assets/img/woman.png';


export interface Questionnaire {
  id: number
  location: string
  name: string
  description: string
  plans: {
    date: string
    content: string
  }
  imgs: string[]
}

const questionnairesList: Questionnaire[] = [
  {
    id: 0,
    location: 'Санкт-Петербург',
    name: 'Виктория, 20 лет',
    description: 'Много работаю ( просто пекарь, бариста, кассир)) Играю на виолончели 🎻 Люблю гулять на свежем воздухе...',
    plans: {
      date: 'Планы на сегодня',
      content: 'Бар, Адмиралтейский район',
    },
    imgs: [
      PngLeady,
      PngWoman,
      PngLeady,
    ],
  },
  {
    id: 1,
    location: 'Москва',
    name: 'Александр, 25 лет',
    description: 'Программист, люблю путешествовать и кататься на велосипеде.',
    plans: {
      date: 'Планы на сегодня',
      content: 'Поход в кино и прогулка по ВДНХ',
    },
    imgs: [
      PngLeady,
      PngWoman,
    ],
  },
  {
    id: 2,
    location: 'Екатеринбург',
    name: 'Ольга, 22 года',
    description: 'Фотограф, увлекаюсь йогой и кулинарией.',
    plans: {
      date: 'Планы на сегодня',
      content: 'Съемка в центре города',
    },
    imgs: [
      PngLeady,
      PngWoman,
    ],
  },
  {
    id: 3,
    location: 'Казань',
    name: 'Дмитрий, 28 лет',
    description: 'Спортсмен, люблю бегать марафоны и заниматься плаванием.',
    plans: {
      date: 'Планы на сегодня',
      content: 'Тренировка в бассейне и бег в парке',
    },
    imgs: [
      PngLeady,
      PngWoman,
    ],
  },
  {
    id: 4,
    location: 'Новосибирск',
    name: 'Екатерина, 30 лет',
    description: 'Художник, вдохновляюсь природой и путешествиями.',
    plans: {
      date: 'Планы на сегодня',
      content: 'Рисование на набережной',
    },
    imgs: [
      PngLeady,
      PngWoman,
    ],
  },
];

const SliderPoster = () => {
  const [index, setIndex] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isSwiped, setIsSwiped] = useState<boolean>(false);

  const changeSlide = (newIndex: number) => {
    if (newIndex < 0) newIndex = questionnairesList.length - 1;
    if (newIndex >= questionnairesList.length) newIndex = 0;
    setIndex(newIndex);
    setOffset(0);
    setIsSwiped(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      changeSlide(index + 1);
      Math.abs(offset) < 5 && setIsSwiped(true);
    },
    onSwipedRight: () => {
      changeSlide(index - 1);
      Math.abs(offset) < 5 && setIsSwiped(true);
    },
    onSwipedUp: () => {
      if( offset < -50 ) changeSlide(index - 1);
      if( offset > 50 ) changeSlide(index - 1);
    },
    onSwipedDown: () => {
      if( offset < -50 ) changeSlide(index - 1);
      if( offset > 50 ) changeSlide(index - 1);
    },
    onSwiping: (eventData) => {
      setOffset(eventData.deltaX)
    },
    trackMouse: true,
  });

  const nextStep = () => changeSlide(index + 1)

  const clickLike = (id: number) => {
    const heartHtml = document.getElementById(`heart-${ id }`);
    if ( heartHtml ) heartHtml.style.animation = 'heart-top 1.5s ease-in-out forwards';
    
    setTimeout(() => {
        if ( heartHtml ) heartHtml.style.animation = 'none';

        nextStep();
    }, 1500)
  }

  const prevStep = () => changeSlide(index - 1)

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const toDetails = () => {
    setTimeout(() => {
      !isSwiped && Math.abs(offset) < 5 && navigate(appRoutes.details);
      dispatch(addRoute(location.pathname));
    }, 100); 
  }

  return (
    <div className="poster__ctx">
      <div {...handlers} className="carousel-container">
        <div
          className="carousel-track"
          style={{
            width: `calc(${questionnairesList.length * 100}% + ${(questionnairesList.length - 1) * 16}px)`,
            transform: `translateX(calc(${-index * 100}% - ${index * 16}px + ${offset}px))`,
            transition: offset === 0 ? 'transform 0.5s ease-in-out' : 'none',
          }}
        >
          {questionnairesList.map( item => (
            <div
              className="carousel-slide"
              key={`slider-item-${item.id}`}
              style={{
                transform: `rotateY(${-Math.min(10, Math.max(-20, offset / 10))}deg)`
              }}
            >
              <SliderItem 
                questionnaires={item}
                toDetails={toDetails}
                nextStep={nextStep}
                clickLike={clickLike}
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
