import { useState } from 'react';
import { warningAlert } from './alert.funcs';
import { useDispatch } from 'react-redux';
import { shareURL } from '@telegram-apps/sdk';
import type { UseShareLinkOptions } from '@/types/ui.types';


export const useShareLink = (options?: UseShareLinkOptions) => {
    const dispatch = useDispatch();

    const [isSharing, setIsSharing] = useState(false);

    const shareLink = async (link: string): Promise<void> => {
        try {
            setIsSharing(true);

            const text = options?.text || 'Посмотри на ссылку, от человека';
            const title = options?.title || 'Интересная ссылка';

            if (shareURL.isAvailable()) {
                await shareURL(link, text);
                return;
            };

            if (navigator.share) {
                await navigator.share({ title, text, url: link });
                return;
            };

            warningAlert(dispatch, 'Ваш браузер не поддерживает общий доступ к ссылкам.');

        } catch (error: any) {
            warningAlert(dispatch, 'Не удалось отправить ссылку! Попробуйте позже');
        } finally {
            setIsSharing(false);
        }
    };

    return { shareLink, isSharing };
};
