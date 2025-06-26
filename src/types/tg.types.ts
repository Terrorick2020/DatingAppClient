export enum EHomeScreenStatus {
    Added = 'added',
    NotAdded = 'not_added',
    Unknown = 'unknown',
}

export type InitHomeScreenRes = EHomeScreenStatus | null | 'error';
