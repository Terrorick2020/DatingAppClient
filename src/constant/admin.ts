import { EProfileRoles, EProfileStatus, EPsychStatus } from '@/types/store.types';
import type { StatusData, UserItemActivCtx } from '@/types/admin.types';


export const SERCH_ID_PATTERN: RegExp = /\d+$/;

export const statusTextMap: Record<EPsychStatus | EProfileStatus, StatusData> = {
    [EPsychStatus.Active]:    { text: "Спец - ", status: "АКТИВЕН", addClass: 'warn' },
    [EPsychStatus.Inactive]:  { text: "Спец - ", status: "НЕАКТИВЕН", addClass: 'off' },
    [EProfileStatus.Blocked]: { text: "", status: "ЗАБЛОКИРОВАН", addClass: 'off' },
    [EProfileStatus.Noob]:    { text: "Про - ", status: "НЕАКТИВЕН", addClass: 'warn' },
    [EProfileStatus.Pro]:     { text: "Про - ", status: "АКТИВЕН", addClass: '' },
} as const;

const unActiveCtx: UserItemActivCtx = { text: 'Деактивировать', targetStat: EProfileStatus.Blocked, type: EProfileRoles.User };

export const userItemActivCtx: Record<EProfileStatus | EPsychStatus, UserItemActivCtx> = {
    [EProfileStatus.Blocked]: { text: 'Активировать', targetStat: EProfileStatus.Noob, type: EProfileRoles.User },
    [EProfileStatus.Noob]:    unActiveCtx,
    [EProfileStatus.Pro]:     unActiveCtx,
    [EPsychStatus.Active]:    { text: 'Деактивировать', targetStat: EPsychStatus.Inactive, type: EProfileRoles.Psych },
    [EPsychStatus.Inactive]:  { text: 'Активировать', targetStat: EPsychStatus.Active, type: EProfileRoles.Psych },
};
