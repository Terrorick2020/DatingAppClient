import { JSX } from 'react';
import { SmartCaptcha } from '@yandex/smart-captcha';
import { useDispatch } from 'react-redux';
import { dfltErrItem } from '@/constant/settings';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { setCaptcaToken } from '@/store/slices/settingsSlice';
import { CAPTURE_KEY, CAPTURE_MODE } from '@/config/env.config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toError } from '@/config/routes.config';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';


export const FillingQuestCaptcha = (): JSX.Element => {
    const lang = useSelector((state: IState) => state.settings.lang);
    const fQErrors = useSelector((state: IState) => state.settings.fQErrors);

    const disatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const handleNetworkError = (): void => {
        navigate(toError);
    };

    const handleSuccess = (token: string): void => {
        disatch(setCaptcaToken(token));

        disatch(setFQErrors({
            ...fQErrors,
            captchaErr: dfltErrItem,
        }));
    };

    const handleTokenExpired = (): void => {
        disatch(setCaptcaToken(''));
    }; 

    return (
        <div className="widgets__captcha">
            <SmartCaptcha
                sitekey={CAPTURE_KEY}
                test={CAPTURE_MODE === 'test'}
                language={lang}
                webview={true}
                onNetworkError={handleNetworkError}
                onSuccess={handleSuccess}
                onTokenExpired={handleTokenExpired}
            />
            { fQErrors.captchaErr.value
                && <p className="captcha-msg-err">{ fQErrors.captchaErr.msg }</p>
            }
        </div>
    )
}

export default FillingQuestCaptcha;
