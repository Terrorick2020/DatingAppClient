import { ELineStatus } from '@/types/store.types';
import type { ChatsFavListItem, ChatsListItem, TargetChat } from '@/types/chats.types';

import PngLeady from '@/assets/img/leady.png';
import PngWoman from '@/assets/img/woman.png';
import PngFemale from '@/assets/img/female.png';


export const chatsFavList: ChatsFavListItem[] = [
  {id: '12434231', timer: '15:41', avatar: PngLeady},
  {id: '12534231', timer: '15:41', avatar: PngWoman},
  {id: '12634231', timer: '15:41', avatar: PngLeady},
  {id: '12734231', timer: '15:41', avatar: PngFemale},
  {id: '12834231', timer: '15:41', avatar: PngLeady},
  {id: '12934231', timer: '15:41', avatar: PngFemale},
  {id: '12034231', timer: '15:41', avatar: PngFemale},
  {id: '12134231', timer: '15:41', avatar: PngWoman},
];

export const chatsList: ChatsListItem[] = [
  { id: '10234231', avatar: PngLeady, name: 'Екатерина', age: 20, lastMsg: 'Сообщение от пользователя 1', timer: 111041, unreadMsgsCount: 3 },
  { id: '11234231', avatar: PngWoman, name: 'Виктория', age: 22, lastMsg: 'Сообщение от пользователя 2', timer: 110941, unreadMsgsCount: 3 },
  { id: '12234231', avatar: PngFemale, name: 'Зухра', age: 21, lastMsg: 'Сообщение от пользователя 3', timer: 110841, unreadMsgsCount: 2 },
  { id: '13234231', avatar: PngWoman, name: 'Елизавета', age: 26, lastMsg: 'Сообщение от пользователя 4', timer: 741, unreadMsgsCount: 4 },
  { id: '14234231', avatar: PngFemale, name: 'Екатерина', age: 24, lastMsg: 'Сообщение от пользователя 5', timer: 110641, unreadMsgsCount: 3 },
  { id: '15234231', avatar: PngLeady, name: 'Елена', age: 23, lastMsg: 'Сообщение от пользователя 6', timer: 110541, unreadMsgsCount: 1 },
  { id: '16234231', avatar: PngFemale, name: 'Влада', age: 21, lastMsg: 'Сообщение от пользователя 7', timer: 441, unreadMsgsCount: 4 },
  { id: '17234231', avatar: PngWoman, name: 'Айгуль', age: 25, lastMsg: 'Сообщение от пользователя 8', timer: 110341, unreadMsgsCount: 3 },
];

export const targetChat: TargetChat = {
    id: '11231',
    timer: 1241321431,
    interlocutor: {
        id: '11234231',
        avatar: PngFemale,
        name: 'Екатерина',
        age: 21,
        lineStat: ELineStatus.Offline,
    },
    chatDialog: [
        {
            id: 0,
            day: '2024-07-12',
            dayListMsg: [
                {
                    id: '0',
                    from: '10234231',
                    to: '11234231',
                    msg: 'Привет, как твои дела? Что у тебя нового. Чем сегодня занимался',
                    time: '14:15',
                    isChecked: true
                },
                {
                    id: '1',
                    from: '10234231',
                    to: '11234231',
                    msg: 'Привет! Все отлично, работаю над проектом. А ты как?',
                    time: '14:20',
                    isChecked: true
                },
                {
                    id:'2',
                    from: '11234231',
                    to: '10234231',
                    msg: 'Здорово! Я тоже занят, но решил сделать перерыв.',
                    time: '14:25',
                    isChecked: true
                }
            ]
        },
        {
            id: 1,
            day: '2024-07-13',
            dayListMsg: [
                {
                    id: '0',
                    from: '11234231',
                    to: '10234231',
                    msg: 'Доброе утро! Какие планы на сегодня?',
                    time: '09:00',
                    isChecked: true
                },
                {
                    id: '1',
                    from: '10234231',
                    to: '11234231',
                    msg: 'Привет! Думаю заняться спортом и немного почитать.',
                    time: '09:05',
                    isChecked: true
                },
                {
                    id: '2',
                    from: '11234231',
                    to: '10234231',
                    msg: 'Отлично! Тогда вечером расскажешь, как прошло.',
                    time: '09:10',
                    isChecked: false
                },
                {
                    id: '3',
                    from: '11234231',
                    to: '10234231',
                    msg: 'Если хочешь, можешь пойти со мной.',
                    time: '09:10',
                    isChecked: false
                },
            ]
        }
    ]
};
