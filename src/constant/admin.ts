import PngWoman from '@/assets/img/woman.png';
import { EProfileStatus } from '@/types/store.types';
import { type ProfilesListItem } from '@/types/admin.types';


export const resUsersList: ProfilesListItem[] = [
    {id: '2342343', avatr: PngWoman, name: 'Татьяна Иванова', status: EProfileStatus.Noob},
    {id: '8148518', avatr: PngWoman, name: 'Валерия Иванова', status: EProfileStatus.Blocked},
    {id: '8111518', avatr: PngWoman, name: 'Константин Иванов', status: EProfileStatus.Noob},
    {id: '8148548', avatr: PngWoman, name: 'Илия Иванова', status: EProfileStatus.Noob},
    {id: '8167808', avatr: PngWoman, name: 'Привет Иванова', status: EProfileStatus.Blocked},
]

export const testIdtList: string[] = [
    '8148518',
    '8111518',
    '8148548',
    '8167808',
]

export const SERCH_ID_PATTERN = /\d+$/;
