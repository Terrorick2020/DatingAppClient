import { EProfileStatus } from '@/types/store.types';
import type { StatusData, UserItemActivCtx } from '@/types/admin.types';


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
