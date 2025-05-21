import { setApiRes } from '@/store/slices/settingsSlice';
import { EApiStatus } from '@/types/settings.type';
import { resetApiRes } from '@/store/slices/settingsSlice';
import type { SetApiRes } from '@/types/settings.type';
import type { RootDispatch } from '@/store';


const defaultAlertFunc = (dispatch: RootDispatch, msg: string, status: EApiStatus): void => {
    const result: SetApiRes = {
        value: true,
        msg,
        status,
        timestamp: Date.now(),
    };

    dispatch(setApiRes(result));
    setTimeout(() => dispatch(resetApiRes()), 0 );
};

export const infoAlert = (dispatch: RootDispatch, msg: string): void => {
    defaultAlertFunc(
        dispatch,
        msg,
        EApiStatus.Info
    );
};

export const successAlert = (dispatch: RootDispatch, msg: string): void => {
    defaultAlertFunc(
        dispatch,
        msg,
        EApiStatus.Success
    );
};

export const warningAlert = (dispatch: RootDispatch, msg: string): void => {
    defaultAlertFunc(
        dispatch,
        msg,
        EApiStatus.Warning
    );
};

export const errorAlert = (dispatch: RootDispatch, msg: string): void => {
    defaultAlertFunc(
        dispatch,
        msg,
        EApiStatus.Error
    );
};
