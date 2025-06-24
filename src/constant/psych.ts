import { ELineStatus } from '@/types/store.types';
import type { PsychListItem, TargerPsych, TargerPsychExpListItem } from '@/types/psych.types';

import PngLeady from '@/assets/img/leady.png';


export const psychTestList: PsychListItem[] = [
    { id: '12434230', avatar: PngLeady, name: 'Михаил', spec: 'Психоаналитик', lineStat: ELineStatus.Online, exp: 8 },
    { id: '11434231', avatar: PngLeady, name: 'Анна', spec: 'Когнитивно-поведенческий терапевт', lineStat: ELineStatus.Offline, exp: 5 },
    { id: '10434232', avatar: PngLeady, name: 'Дмитрий', spec: 'Гештальт-терапевт', lineStat: ELineStatus.Online, exp: 4 },
    { id: '13434233', avatar: PngLeady, name: 'Екатерина', spec: 'Психотерапевт', lineStat: ELineStatus.Online, exp: 11 },
    { id: '14434234', avatar: PngLeady, name: 'Алексей', spec: 'Клинический психолог', lineStat: ELineStatus.Offline, exp: 23 },
    { id: '15434235', avatar: PngLeady, name: 'Мария', spec: 'Детский психолог', lineStat: ELineStatus.Offline, exp: 1 },
    { id: '16434236', avatar: PngLeady, name: 'Иван', spec: 'Травматерапевт', lineStat: ELineStatus.Offline, exp: 5 },
    { id: '17434237', avatar: PngLeady, name: 'Светлана', spec: 'Нейропсихолог', lineStat: ELineStatus.Online, exp: 7 },
];

const expListValues: TargerPsychExpListItem[] = [
    { id: '0', title: 'Частная практика', desc: 'Психоаналитик', expGap: '2015-н.в.' },
    { id: '1', title: 'Медицинский центр "Здоровье"', desc: 'Клинический психолог', expGap: '2012-2015' },
    { id: '2', title: 'Городская больница №5', desc: 'Психиатр', expGap: '2008-2012' },
    { id: '3', title: 'Научный институт психологии', desc: 'Исследователь', expGap: '2005-2008' },
    { id: '4', title: 'Университетская клиника', desc: 'Ассистент врача', expGap: '2003-2005' }
];

export const targerPsychList: TargerPsych[] = [
    { id: '12434230', photo: PngLeady, name: 'Михаил', spec: 'Психоаналитик', lineStat: ELineStatus.Online, exp: 8, desc: 'Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате.', expList: expListValues },
    { id: '11434231', photo: PngLeady, name: 'Анна', spec: 'Когнитивно-поведенческий терапевт', lineStat: ELineStatus.Offline, exp: 5, desc: 'Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате.', expList: expListValues },
    { id: '10434232', photo: PngLeady, name: 'Дмитрий', spec: 'Гештальт-терапевт', lineStat: ELineStatus.Online, exp: 4, desc: 'Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате.', expList: expListValues },
    { id: '13434233', photo: PngLeady, name: 'Екатерина', spec: 'Психотерапевт', lineStat: ELineStatus.Online, exp: 11, desc: 'Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате.', expList: expListValues },
    { id: '14434234', photo: PngLeady, name: 'Алексей', spec: 'Клинический психолог', lineStat: ELineStatus.Offline, exp: 23, desc: 'Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате.', expList: expListValues },
    { id: '15434235', photo: PngLeady, name: 'Мария', spec: 'Детский психолог', lineStat: ELineStatus.Offline, exp: 1, desc: 'Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате.', expList: expListValues },
    { id: '16434236', photo: PngLeady, name: 'Иван', spec: 'Травматерапевт', lineStat: ELineStatus.Offline, exp: 5, desc: 'Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате.', expList: expListValues },
    { id: '17434237', photo: PngLeady, name: 'Светлана', spec: 'Нейропсихолог', lineStat: ELineStatus.Online, exp: 7, desc: 'Выберите любого специалиста и опишите ему свою проблему или попросите совет. Специалист ответит вам в свободное время, а диалог появится в общем чате.', expList: expListValues },
];
