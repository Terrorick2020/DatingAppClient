import { EProfileRoles } from './store.types';


export enum ETgCloudeStore {
    NumRejSetGeo = 'numRejSetGeo',
    NumRejSetHomeScreen = 'numRejSetHomeScreen',
}

export enum EHomeScreenStatus {
    Added = 'added',
    NotAdded = 'not_added',
    Unknown = 'unknown',
}

export type InitHomeScreenRes = EHomeScreenStatus | null | 'error';

export enum EStatusSetHomeScreen {
    Success = 'success',
    Error = 'error',
}

export interface GetParamsRes {
    code: string
    type: EProfileRoles
}
