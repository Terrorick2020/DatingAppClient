import { type FillQuestBtnText, type PlayingSvgVars, KeyFQBtnText } from '@/types/register.typs';

import SvgMediaPause from '@/assets/icon/media-pause.svg';
import SvgMediaPlay from '@/assets/icon/media-play.svg';


export const playingSvgVars: PlayingSvgVars[] = [
    {addClass: 'pause', svg: SvgMediaPlay, alt: 'play'},
    {addClass: '', svg: SvgMediaPause, alt: 'pause'},
]

export const fQBtnText: FillQuestBtnText = {
    [KeyFQBtnText.First]: {
        text: 'Продолжить',
        loadText: 'Регистрация...',
        mark: KeyFQBtnText.First,
    },
    [KeyFQBtnText.Other]: {
        text: 'Сохранить',
        loadText: 'Сохранение...',
        mark: KeyFQBtnText.Other,
    }
}

export const fQHeadTxt = {
    [KeyFQBtnText.First]: 'Регистрация',
    [KeyFQBtnText.Other]: 'Обновление профиля'
}

export const MAX_LEN_BIO = 500;
