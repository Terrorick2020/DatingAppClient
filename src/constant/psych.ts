import { ELineStatus } from '@/types/store.types';
import { type PsychListItem } from '@/types/psych.types';

import PngLeady from '@/assets/img/leady.png';
import PngWoman from '@/assets/img/woman.png';
import PngFemale from '@/assets/img/female.png';


export const psychTestList: PsychListItem[] = [
    { id: '12434230', avatar: PngWoman, name: 'Михаил', spec: 'Психоаналитик', lineStat: ELineStatus.Online, exp: 8 },
    { id: '11434231', avatar: PngLeady, name: 'Анна', spec: 'Когнитивно-поведенческий терапевт', lineStat: ELineStatus.Offline, exp: 5 },
    { id: '10434232', avatar: PngWoman, name: 'Дмитрий', spec: 'Гештальт-терапевт', lineStat: ELineStatus.Online, exp: 4 },
    { id: '13434233', avatar: PngLeady, name: 'Екатерина', spec: 'Психотерапевт', lineStat: ELineStatus.Online, exp: 11 },
    { id: '14434234', avatar: PngWoman, name: 'Алексей', spec: 'Клинический психолог', lineStat: ELineStatus.Offline, exp: 23 },
    { id: '15434235', avatar: PngFemale, name: 'Мария', spec: 'Детский психолог', lineStat: ELineStatus.Offline, exp: 1 },
    { id: '16434236', avatar: PngLeady, name: 'Иван', spec: 'Травматерапевт', lineStat: ELineStatus.Offline, exp: 5 },
    { id: '17434237', avatar: PngFemale, name: 'Светлана', spec: 'Нейропсихолог', lineStat: ELineStatus.Online, exp: 7 },
];
