import { PlanLabelSvgType } from "@/types/ui.types";
import type {
  SliderItem,
  LikesItem,
  ChatsCtxFavoriteItem,
  ChatsCtxChatsItem
} from "@/types/quest.types";

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

export const likesList: LikesItem[] = [
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.success,
      timer: {
        value: "12:34",
        isCritical: false
      },
      name: "Алексей",
      age: 28
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.success,
      timer: {
        value: "05:20",
        isCritical: true
      },
      name: "Мария",
      age: 24
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.success,
      timer: {
        value: "23:15",
        isCritical: false
      },
      name: "Дмитрий",
      age: 31
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.error,
      timer: {
        value: "01:45",
        isCritical: true
      },
      name: "Анна",
      age: 22
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.error,
      timer: {
        value: "18:30",
        isCritical: false
      },
      name: "Сергей",
      age: 35
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.error,
      timer: {
        value: "09:15",
        isCritical: false
      },
      name: "Елена",
      age: 27
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.ordinary,
      timer: {
        value: "00:30",
        isCritical: true
      },
      name: "Иван",
      age: 29
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.ordinary,
      timer: {
        value: "14:20",
        isCritical: false
      },
      name: "Ольга",
      age: 26
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.ordinary,
      timer: {
        value: "03:10",
        isCritical: true
      },
      name: "Павел",
      age: 33
    },
    {
      id: "12234231",
      avatar: PngFemale,
      planStatus: PlanLabelSvgType.ordinary,
      timer: {
        value: "20:45",
        isCritical: false
      },
      name: "Наталья",
      age: 30
    }
  ];

export const chatsFavList: ChatsCtxFavoriteItem[] = [
  {id: '12234231', timer: '15:41', avatar: PngLeady},
  {id: '12234231', timer: '15:41', avatar: PngWoman},
  {id: '12234231', timer: '15:41', avatar: PngLeady},
  {id: '12234231', timer: '15:41', avatar: PngFemale},
  {id: '12234231', timer: '15:41', avatar: PngLeady},
  {id: '12234231', timer: '15:41', avatar: PngFemale},
  {id: '12234231', timer: '15:41', avatar: PngFemale},
  {id: '12234231', timer: '15:41', avatar: PngWoman},
];

export const chatsList: ChatsCtxChatsItem[] = [
  { id: '12234231', avatar: PngLeady, name: 'Екатерина', age: 20, lastMsg: 'Сообщение от пользователя 1', timer: '11:10:41', unreadMsgsCount: 3 },
  { id: '12234231', avatar: PngWoman, name: 'Виктория', age: 22, lastMsg: 'Сообщение от пользователя 2', timer: '11:09:41', unreadMsgsCount: 3 },
  { id: '12234231', avatar: PngFemale, name: 'Зухра', age: 21, lastMsg: 'Сообщение от пользователя 3', timer: '11:08:41', unreadMsgsCount: 2 },
  { id: '12234231', avatar: PngWoman, name: 'Елизавета', age: 26, lastMsg: 'Сообщение от пользователя 4', timer: '07:41', unreadMsgsCount: 4 },
  { id: '12234231', avatar: PngFemale, name: 'Екатерина', age: 24, lastMsg: 'Сообщение от пользователя 5', timer: '11:06:41', unreadMsgsCount: 3 },
  { id: '12234231', avatar: PngLeady, name: 'Елена', age: 23, lastMsg: 'Сообщение от пользователя 6', timer: '11:05:41', unreadMsgsCount: 1 },
  { id: '12234231', avatar: PngFemale, name: 'Влада', age: 21, lastMsg: 'Сообщение от пользователя 7', timer: '04:41', unreadMsgsCount: 4 },
  { id: '12234231', avatar: PngWoman, name: 'Айгуль', age: 25, lastMsg: 'Сообщение от пользователя 8', timer: '11:03:41', unreadMsgsCount: 3 },
];
