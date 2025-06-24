import type {
    FQErrorsItem,
    SelSexVarsBase,
    BadgeBlockItem,
    LineStatusAttr,
} from '@/types/settings.type';

import { ESex, ELineStatus, ETypingStatus } from '@/types/store.types';


export const dfltErrItem: FQErrorsItem = {
    value: false,
    msg: '',
}

export const badgeEmptyItem: BadgeBlockItem = {
    value: false,
    content: 0,
}

export const AGE_PATTERN: RegExp = /\d+$/;

export const ANIME_DURATION: number = 200;
export const ANIME_DELAY: number = 200;
export const ANIME_DAMPING: number = 0.5;

export const SNACK_TIMEOUT: number = 4000;
export const SNACK_COUNT:number = 3;

export const EMPTY_INPUT_ERR_MSG = 'Поле обязательно для ввода';

export const selSexVarsBase: SelSexVarsBase = {
    [ESex.All]: [
        {id: 0, value: ESex.Female, label: 'Женщину', isDisabled: false},
        {id: 1, value: ESex.Male, label: 'Мужчину', isDisabled: false},
        {id: 2, value: ESex.All, label: 'Всех', isDisabled: false},
    ],
    [ESex.Female]: [
        {id: 0, value: ESex.Female, label: 'Женщину', isDisabled: true},
        {id: 1, value: ESex.Male, label: 'Мужчину', isDisabled: false},
        {id: 2, value: ESex.All, label: 'Всех', isDisabled: true},
    ],
    [ESex.Male]: [
        {id: 0, value: ESex.Female, label: 'Женщину', isDisabled: false},
        {id: 1, value: ESex.Male, label: 'Мужчину', isDisabled: true},
        {id: 2, value: ESex.All, label: 'Всех', isDisabled: true},
    ],
}

export const lineStatusAttr: LineStatusAttr = {
    [ELineStatus.Online]: {
        addClass: '',
        text: 'Онлайн',
    },
    [ELineStatus.Offline]: {
        addClass: 'off',
        text: 'Оффлайн',
    },
    [ETypingStatus.Typing]: {
        addClass: 'typing',
        text: 'Печатает',
    },
    [ETypingStatus.UnTyping]: {
        addClass: '',
        text: '',
    }
}
