import type {
    ProfilesListItem,
    TargetProfile,
    StatusData,
    UserItemActivCtx
} from '@/types/admin.types';

import { EProfileStatus, EProfileRoles } from '@/types/store.types';

import PngWoman from '@/assets/img/woman.png';
import PngMale from '@/assets/img/male.png';


export const resUsersList: ProfilesListItem[] = [
    {id: '2342343', role: EProfileRoles.User, avatr: PngWoman, name: 'Татьяна Иванова', status: EProfileStatus.Noob},
    {id: '8148518', role: EProfileRoles.User, avatr: PngWoman, name: 'Валерия Иванова', status: EProfileStatus.Blocked},
    {id: '8111518', role: EProfileRoles.User, avatr: PngWoman, name: 'Константин Иванов', status: EProfileStatus.Pro},
    {id: '8148548', role: EProfileRoles.User, avatr: PngWoman, name: 'Илия Иванова', status: EProfileStatus.Noob},
    {id: '8167808', role: EProfileRoles.User, avatr: PngWoman, name: 'Привет Иванова', status: EProfileStatus.Blocked},
]

export const resPsychsList: ProfilesListItem[] = [
    {id: '2342343', role: EProfileRoles.Psych, avatr: PngMale, name: 'Татьяна Иванова', status: EProfileStatus.Noob},
    {id: '8148518', role: EProfileRoles.Psych, avatr: PngMale, name: 'Валерия Иванова', status: EProfileStatus.Blocked},
    {id: '8111518', role: EProfileRoles.Psych, avatr: PngMale, name: 'Константин Иванов', status: EProfileStatus.Pro},
    {id: '8148548', role: EProfileRoles.Psych, avatr: PngMale, name: 'Илия Иванова', status: EProfileStatus.Noob},
    {id: '8167808', role: EProfileRoles.Psych, avatr: PngMale, name: 'Привет Иванова', status: EProfileStatus.Blocked},
]

export const targetsUsers: Record<string, TargetProfile> = {
    '2342343': {
        id: '2342343',
        role: EProfileRoles.User,
        photos: [PngWoman, PngWoman, PngWoman],
        name: 'Иван Иванов',
        age: 25,
        city: 'Москва',
        status: EProfileStatus.Noob,
        description: 'Привет! Я очень трудолюбивый человек, и у меня есть несколько профессий, которые я с удовольствием совмещаю: я работаю пекарем, баристой и кассиром. Каждая из этих работ приносит мне радость и позволяет развиваться в разных направлениях. В свободное время я увлекаюсь игрой на виолончели 🎻, что приносит мне огромное удовольствие и помогает расслабиться после насыщенного рабочего дня. Кроме того, я обожаю проводить время на свежем воздухе, гуляя по живописным паркам, наслаждаясь красотой природы и общаясь с друзьями. Эти моменты наполняют мою жизнь счастьем и гармонией.'
    },
    '8148518': {
        id: '8148518',
        role: EProfileRoles.User,
        photos: [PngWoman, PngWoman],
        name: 'Алексей Петров',
        age: 30,
        city: 'Санкт-Петербург',
        status: EProfileStatus.Blocked,
        description: 'Многозадачный специалист с опытом в пищевом сервисе. Умею создавать идеальную атмосферу: от ароматных круассанов до безупречного обслуживания. Ценю командную работу, внимание к деталям и радость клиентов. В свободное время изучаю нюансы музыкальной композиции (виолончель) и восстанавливаю силы на прогулках в природе.'
    },
    '8111518': {
        id: '8111518',
        role: EProfileRoles.User,
        photos: [],
        name: 'Мария Сидорова',
        age: 23,
        city: 'Казань',
        status: EProfileStatus.Pro,
        description: 'Привет! Я очень трудолюбивый человек, и у меня есть несколько профессий, которые я с удовольствием совмещаю: я работаю пекарем, баристой и кассиром. Каждая из этих работ приносит мне радость и позволяет развиваться в разных направлениях. В свободное время я увлекаюсь игрой на виолончели 🎻, что приносит мне огромное удовольствие и помогает расслабиться после насыщенного рабочего дня. Кроме того, я обожаю проводить время на свежем воздухе, гуляя по живописным паркам, наслаждаясь красотой природы и общаясь с друзьями. Эти моменты наполняют мою жизнь счастьем и гармонией.'
    },
    '8148548': {
        id: '8148548',
        role: EProfileRoles.User,
        photos: [PngWoman],
        name: 'Елена Смирнова',
        age: 28,
        city: 'Новосибирск',
        status: EProfileStatus.Noob,
        description: 'Многозадачный специалист с опытом в пищевом сервисе. Умею создавать идеальную атмосферу: от ароматных круассанов до безупречного обслуживания. Ценю командную работу, внимание к деталям и радость клиентов. В свободное время изучаю нюансы музыкальной композиции (виолончель) и восстанавливаю силы на прогулках в природе.'
    },
    '8167808': {
        id: '8167808',
        role: EProfileRoles.User,
        photos: [PngWoman, PngWoman, PngWoman],
        name: 'Дмитрий Кузнецов',
        age: 22,
        city: 'Екатеринбург',
        status: EProfileStatus.Blocked,
        description: 'Привет! Я очень трудолюбивый человек, и у меня есть несколько профессий, которые я с удовольствием совмещаю: я работаю пекарем, баристой и кассиром. Каждая из этих работ приносит мне радость и позволяет развиваться в разных направлениях. В свободное время я увлекаюсь игрой на виолончели 🎻, что приносит мне огромное удовольствие и помогает расслабиться после насыщенного рабочего дня. Кроме того, я обожаю проводить время на свежем воздухе, гуляя по живописным паркам, наслаждаясь красотой природы и общаясь с друзьями. Эти моменты наполняют мою жизнь счастьем и гармонией.'
    },
};

export const SERCH_ID_PATTERN: RegExp = /\d+$/;

export const statusTextMap: Record<string, StatusData> = {
    [EProfileStatus.Blocked]: { text: "", status: "ЗАБЛОКИРОВАН", addClass: 'off' },
    [EProfileStatus.Noob]: { text: "Про - ", status: "НЕАКТИВЕН", addClass: 'warn' },
    [EProfileStatus.Pro]: { text: "Про - ", status: "АКТИВЕН", addClass: '' }
};

const unActiveCtx: UserItemActivCtx = {text: 'Деактивировать', targetStat: EProfileStatus.Blocked};
export const userItemActivCtx: Record<string, UserItemActivCtx> = {
    [EProfileStatus.Blocked]: { text: 'Активировать', targetStat: EProfileStatus.Noob },
    [EProfileStatus.Noob]: unActiveCtx,
    [EProfileStatus.Pro]: unActiveCtx,
}