import type { FQErrorsItem, InterestsVarsItem } from '@/types/settings.type';
import { ESex } from '@/types/store.types';

export const dfltErrItem: FQErrorsItem = {
    value: false,
    msg: '',
}

export const AGE_PATTERN = /\d+$/;

export const ADD_INTEREST_VAR = 'add';

export const EOppositeSex = {
    [ESex.Male]: ESex.Female,
    [ESex.Female]: ESex.Male,
}

export const interestsVarsList: InterestsVarsItem[] = [
    { id: 0, value: 'communication', label: 'Общение' },
    { id: 1, value: 'friendship', label: 'Дружба' },
    { id: 2, value: 'love', label: 'Любовь' },
    { id: 3, value: 'sex', label: 'Секс' },
]