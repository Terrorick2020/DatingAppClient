import type {
    FQErrorsItem,
    InterestsVarsItem,
    SelSexVarsBase,
    BaseVarsItem,
    BadgeBlockItem,
} from '@/types/settings.type';
import { ESex, ELineStatus } from '@/types/store.types';


export const dfltErrItem: FQErrorsItem = {
    value: false,
    msg: '',
}

export const badgeEmptyItem: BadgeBlockItem = {
    value: false,
    content: '',
}

export const AGE_PATTERN: RegExp = /\d+$/;

export const ANIME_DURATION: number = 200;

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

export const cityesVarsList: BaseVarsItem[] = [
    { id: 0, value: 'piter', label: 'Санкт-Петербург' },
    { id: 1, value: 'moscow', label: 'Москва' },
    { id: 2, value: 'kazan', label: 'Казань' },
    { id: 3, value: 'novosibirsk', label: 'Новосибирск' },
    { id: 4, value: 'ekb', label: 'Екатеринбург' }
]

export const interestsVarsList: InterestsVarsItem[] = [
    { id: 0, value: 'communication', label: 'Общение', isOppos: false },
    { id: 1, value: 'friendship', label: 'Дружба', isOppos: false },
    { id: 2, value: 'love', label: 'Любовь', isOppos: true },
    { id: 3, value: 'sex', label: 'Секс', isOppos: true },
]

export const complaintsVarsList: BaseVarsItem[] = [
    {id: 0, value: 'Фейк', label: 'Фейк'},
    {id: 1, value: 'Неприемлемый контент', label: 'Неприемлемый контент'},
    {id: 2, value: 'Возраст', label: 'Возраст'},
    {id: 3, value: 'Оскорбления', label: 'Оскорбления'},
    {id: 4, value: 'Поведения вне Вместе', label: 'Поведения вне Вместе'},
    {id: 5, value: 'Поведения вне Вместе', label: 'Поведения вне Вместе'},
]

export const targetComplaintsVarsList: BaseVarsItem[] = [
    {id: 6, value: 'Использует мои данные', label: 'Использует мои данные'},
    {id: 7, value: 'Использует данные моего знакомого', label: 'Использует данные моего знакомого'},
    {id: 8, value: 'Использует данные известного человека', label: 'Использует данные известного человека'},
    {id: 9, value: 'Ведет себя, как робот', label: 'Ведет себя, как робот'},
    {id: 10, value: 'Ничего не рассказывает о себе', label: 'Ничего не рассказывает о себе'},
    {id: 11, value: 'Другое', label: 'Другое'},
]

export const plansVarsList: BaseVarsItem[] = [
    {id: 0, value: 'Кино', label: 'Кино'},
    {id: 1, value: 'Бар', label: 'Бар'},
    {id: 2, value: 'Театр', label: 'Театр'},
    {id: 3, value: 'Спорт', label: 'Спорт'},
    {id: 4, value: 'Прогулка', label: 'Прогулка'},
    {id: 5, value: 'Танцы', label: 'Танцы'},
    {id: 6, value: 'Музей', label: 'Музей'},
    {id: 7, value: 'Музыка', label: 'Музыка'},
    {id: 8, value: 'Природа', label: 'Природа'},
    {id: 9, value: 'Иное', label: 'Иное'},
]

export const districtsVarsList: BaseVarsItem[] = [
    {id: 0, value: 'Адмиралтейский', label: 'Адмиралтейский район'},
    {id: 1, value: 'Приморский', label: 'Приморский район'},
    {id: 2, value: 'Крестовский', label: 'Крестовский район'},
    {id: 3, value: 'Василеостровский', label: 'Василеостровский район'},
    {id: 4, value: 'Московский', label: 'Московский район'},
    {id: 5, value: 'Невский', label: 'Невский район'},
    {id: 6, value: 'Фрунзенский', label: 'Фрунзенский район'},
    {id: 7, value: 'Центральный', label: 'Центральный район'},
]
