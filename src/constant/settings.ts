import type { FQErrorsItem, InterestsVarsItem, SelSexVarsBase, ComplaintsVarsItem } from '@/types/settings.type';
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

export const complaintsVarsList: ComplaintsVarsItem[] = [
    {id: 0, value: 'Фейк', label: 'Фейк'},
    {id: 1, value: 'Неприемлемый контент', label: 'Неприемлемый контент'},
    {id: 2, value: 'Возраст', label: 'Возраст'},
    {id: 3, value: 'Оскорбления', label: 'Оскорбления'},
    {id: 4, value: 'Поведения вне Вместе', label: 'Поведения вне Вместе'},
    {id: 5, value: 'Поведения вне Вместе', label: 'Поведения вне Вместе'},
]

export const targetComplaintsVarsList: ComplaintsVarsItem[] = [
    {id: 6, value: 'Использует мои данные', label: 'Использует мои данные'},
    {id: 7, value: 'Использует данные моего знакомого', label: 'Использует данные моего знакомого'},
    {id: 8, value: 'Использует данные известного человека', label: 'Использует данные известного человека'},
    {id: 9, value: 'Ведет себя, как робот', label: 'Ведет себя, как робот'},
    {id: 10, value: 'Ничего не рассказывает о себе', label: 'Ничего не рассказывает о себе'},
    {id: 11, value: 'Другое', label: 'Другое'},
]
