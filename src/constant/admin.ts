import { type PersonType } from '@/types/admin.types';
import { EProfileRoles } from '@/types/store.types';


export const personTypeList: PersonType[] = [
    { id: 0, value: EProfileRoles.User, label: 'Пользователи' },
    { id: 1, value: EProfileRoles.Psych, label: 'Пси-специалисты' }
]

export const testIdtList: string[] = [
    '8148518',
    '8111518',
    '8148548',
    '8167808',
]
