import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import SliderItem from './SliderItem';

import PngLeady from '@/assets/img/leady.png'
import PngWoomen from '@/assets/img/woman.png'


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
      PngWoomen,
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
      PngWoomen,
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
      PngWoomen,
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
      PngWoomen,
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
      PngWoomen,
    ],
  },
];

const SliderPoster = () => {
  const [index, setIndex] = useState(0);

  const changeSlide = (newIndex: number) => {
    if (newIndex < 0) newIndex = questionnairesList.length - 1;
    if (newIndex >= questionnairesList.length) newIndex = 0;
    setIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changeSlide(index + 1),
    onSwipedRight: () => changeSlide(index - 1),
    trackMouse: true,
  });

  const nextStep = () => changeSlide(index + 1)

  const clickLike = () => {
    const heartHtml = document.getElementById('heart');
    if ( heartHtml ) heartHtml.style.animation = 'heart-top 1.5s ease-in-out forwards';
    
    setTimeout(() => {
        if ( heartHtml ) heartHtml.style.animation = 'none';

        nextStep();
    }, 1500)
  }

  const prevStep = () => changeSlide(index - 1)

  return (
    <div className="poster__ctx">
      <div {...handlers} className="carousel-container">
        <div
          className="carousel-track"
          style={{
            width: `${questionnairesList.length * 100}%`,
            transform: `translateX(${-index * 100}%)`,
          }}
        >
          {questionnairesList.map( item => (
            <div key={`slider-item-${item.id}`} className="carousel-slide">
              <SliderItem 
                questionnaires={item}
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
