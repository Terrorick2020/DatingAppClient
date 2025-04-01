import { type PersonType } from '@/types/admin.types';
import { ESearchType } from '@/types/store.types';


export const personTypeList: PersonType[] = [
    { id: 0, value: ESearchType.User, label: 'Пользователи' },
    { id: 1, value: ESearchType.Psych, label: 'Пси-специалисты' }
]

export const testIdtList: string[] = [
    '8148518',
    '8111518',
    '8148548',
    '8167808',
]
