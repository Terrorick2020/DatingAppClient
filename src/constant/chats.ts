import type { ChatsFavListItem, ChatsListItem } from "@/types/chats.types";

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
  { id: '10234231', avatar: PngLeady, name: 'Екатерина', age: 20, lastMsg: 'Сообщение от пользователя 1', timer: '11:10:41', unreadMsgsCount: 3 },
  { id: '11234231', avatar: PngWoman, name: 'Виктория', age: 22, lastMsg: 'Сообщение от пользователя 2', timer: '11:09:41', unreadMsgsCount: 3 },
  { id: '12234231', avatar: PngFemale, name: 'Зухра', age: 21, lastMsg: 'Сообщение от пользователя 3', timer: '11:08:41', unreadMsgsCount: 2 },
  { id: '13234231', avatar: PngWoman, name: 'Елизавета', age: 26, lastMsg: 'Сообщение от пользователя 4', timer: '07:41', unreadMsgsCount: 4 },
  { id: '14234231', avatar: PngFemale, name: 'Екатерина', age: 24, lastMsg: 'Сообщение от пользователя 5', timer: '11:06:41', unreadMsgsCount: 3 },
  { id: '15234231', avatar: PngLeady, name: 'Елена', age: 23, lastMsg: 'Сообщение от пользователя 6', timer: '11:05:41', unreadMsgsCount: 1 },
  { id: '16234231', avatar: PngFemale, name: 'Влада', age: 21, lastMsg: 'Сообщение от пользователя 7', timer: '04:41', unreadMsgsCount: 4 },
  { id: '17234231', avatar: PngWoman, name: 'Айгуль', age: 25, lastMsg: 'Сообщение от пользователя 8', timer: '11:03:41', unreadMsgsCount: 3 },
];
