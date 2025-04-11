<<<<<<< HEAD
import type { InterestsVariant } from '@/types/settings.type';


export const interestsVariantsList: InterestsVariant[] = [
    { id: 0, value: 'communication', label: 'Общение' },
    { id: 1, value: 'friendship', label: 'Дружба' },
    { id: 2, value: 'love', label: 'Любовь' },
    { id: 3, value: 'sex', label: 'Секс' },
]

export const districtsList = [
    { id: 0, value: 'piter', label: 'Санкт-Петербург' },
    { id: 1, value: 'moscow', label: 'Москва' },
    { id: 2, value: 'kazan', label: 'Казань' },
    { id: 3, value: 'novosibirsk', label: 'Новосибирск' },
    { id: 4, value: 'ekb', label: 'Екатеринбург' }
];
=======
import type { FQErrorsItem, InterestsVarsItem, SelSexVarsBase } from '@/types/settings.type';
import { ESex } from '@/types/store.types';


export const dfltErrItem: FQErrorsItem = {
    value: false,
    msg: '',
}

export const AGE_PATTERN = /\d+$/;

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

export const interestsVarsList: InterestsVarsItem[] = [
    { id: 0, value: 'communication', label: 'Общение', isOppos: false },
    { id: 1, value: 'friendship', label: 'Дружба', isOppos: false },
    { id: 2, value: 'love', label: 'Любовь', isOppos: true },
    { id: 3, value: 'sex', label: 'Секс', isOppos: true },
]
>>>>>>> dev
