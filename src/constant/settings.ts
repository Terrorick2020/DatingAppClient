import type { FQErrorsItem, InterestsVarsItem, SelSexVarsBase } from '@/types/settings.type';
import { ESex, ELineStatus } from '@/types/store.types';


export const dfltErrItem: FQErrorsItem = {
    value: false,
    msg: '',
}

export const AGE_PATTERN: RegExp = /\d+$/;

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

export const lineStatusAttr = {
    [ELineStatus.Online]: {
        addClass: '',
        text: 'Онлайн',
    },
    [ELineStatus.Offline]: {
        addClass: 'off',
        text: 'Оффлайн',
    },
}

export const interestsVarsList: InterestsVarsItem[] = [
    { id: 0, value: 'communication', label: 'Общение', isOppos: false },
    { id: 1, value: 'friendship', label: 'Дружба', isOppos: false },
    { id: 2, value: 'love', label: 'Любовь', isOppos: true },
    { id: 3, value: 'sex', label: 'Секс', isOppos: true },
]
