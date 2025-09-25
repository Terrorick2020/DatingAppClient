import {
    isTMA,
    viewport,
    switchInlineQuery,
    type SwitchInlineQueryChatType,
} from '@telegram-apps/sdk';

import { isTgMobile } from './tg.funcs';
import { infoAlert } from './alert.funcs';
import type { RootDispatch } from '@/store';


export const handleTechSupport = async (dispatch: RootDispatch): Promise<void> => {
    const isTg = await isTMA();
    
    if(!isTg) {
        infoAlert(
            dispatch,
            'Тех поддержка возможна только в приложении Telegram',
        );

        return;
    };

    const text: string = '/complaint';
    const utils: SwitchInlineQueryChatType[] = [ 'users', 'groups' ];
    const isTelegramMobile = isTgMobile();

    if(!isTelegramMobile) {
        viewport.exitFullscreen();
    };

    if(switchInlineQuery.isAvailable()) {
        switchInlineQuery(text, utils);
    } else {
        infoAlert(
            dispatch,
            'Для получения тех. помощи необходимо закрыть приложение' +
            ' и нажать на соответствующую кнопку в боте',
        );
    };
};
