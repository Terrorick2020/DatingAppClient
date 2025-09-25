import { ProfileSelf } from './profile.types';
import { FQErrors } from './settings.type';

export interface MediaProgressState {
    played: number
    playedSeconds: number
    loaded: number
    loadedSeconds: number
}

export type ValidationField = {
    value: keyof ProfileSelf;
    key: keyof FQErrors;
};

export interface PropsMediaContentBg {
    isFirstly: boolean
    isPlaying: boolean
    isLoading: boolean
    isError: boolean
    handlePlaying: () => void
    handleSeekBy: (seconds: number) => void
}

export enum KeyFQBtnText {
    First = 'first',
    Other = 'other',
}

export interface FQBtnTextItem {
    text: string
    loadText: string
    mark: KeyFQBtnText
}

export interface FillQuestBtnText  {
    [KeyFQBtnText.First]: FQBtnTextItem
    [KeyFQBtnText.Other]: FQBtnTextItem
}

export interface PropsFillingQuestHeader {
    mark: KeyFQBtnText
}

export interface PlayingSvgVars {
    addClass: string
    svg: string
    alt: string
}
