import type { SliderItem, DetailsTargetUser } from "@/types/quest.types";

import PngLeady from '@/assets/img/leady.png';
import PngWoman from '@/assets/img/woman.png';
import PngFemale from '@/assets/img/female.png';


export const slidersList: SliderItem[] = [
    {
        id: '12234231',
        city: 'Санкт-Петербург',
        name: 'Виктория',
        age: 20,
        description: 'Много работаю ( просто пекарь, бариста, кассир)) Играю на виолончели 🎻 Люблю гулять на свежем воздухе...',
        plans: {
            date: 'Планы на сегодня',
            content: 'Бар, Адмиралтейский район',
        },
        photos: [
            PngLeady,
            PngWoman,
            PngFemale,
        ],
    },
    {
        id: '12234231',
        city: 'Москва',
        name: 'Александр',
        age: 25,
        description: 'Программист, люблю путешествовать и кататься на велосипеде.',
        plans: {
            date: 'Планы на сегодня',
            content: 'Поход в кино и прогулка по ВДНХ',
        },
        photos: [
            PngLeady,
            PngWoman,
            PngFemale,
        ],
    },
    {
        id: '12234231',
        city: 'Екатеринбург',
        name: 'Ольга',
        age: 22,
        description: 'Фотограф, увлекаюсь йогой и кулинарией.',
        plans: {
            date: 'Планы на сегодня',
            content: 'Съемка в центре города',
        },
        photos: [
            PngLeady,
            PngWoman,
        ],
    },
    {
        id: '12234231',
        city: 'Казань',
        name: 'Дмитрий',
        age: 28,
        description: 'Спортсмен, люблю бегать марафоны и заниматься плаванием.',
        plans: {
            date: 'Планы на сегодня',
            content: 'Тренировка в бассейне и бег в парке',
        },
        photos: [
            PngFemale,
            PngWoman,
        ],
    },
    {
        id: '12234231',
        city: 'Новосибирск',
        name: 'Екатерина',
        age: 30,
        description: 'Художник, вдохновляюсь природой и путешествиями.',
        plans: {
            date: 'Планы на сегодня',
            content: 'Рисование на набережной',
        },
        photos: [
            PngLeady,
            PngFemale,
        ],
    },
];

export const targetUser: DetailsTargetUser = {
    id: '12234231',
    photos: [
        PngLeady,
        PngWoman,
        PngFemale,
    ],
    city: 'Новосибирск',
    name: 'Екатерина',
    age: 20,
    plans: {
        targetTime: '18:00',
        district: 'Адмиралтейский район',
        place: 'Коктелтный бар',
        description: 'Хочу сходить в коктейльный бар, выпить пару коктейлей и пообщаться.',
    },
    bio: 'Много работаю ( просто пекарь, бариста, кассир)) Играю на виолончели 🎻 Люблю гулять на свежем воздухе...Много работаю ( просто пекарь, бариста, кассир)) Играю на виолончели 🎻 Люблю гулять на свежем воздухе',
}
