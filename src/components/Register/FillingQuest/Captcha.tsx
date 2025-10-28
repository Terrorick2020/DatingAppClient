import { JSX } from 'react';
import { SmartCaptcha } from '@yandex/smart-captcha';
import { createSelector } from 'reselect';
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


const selectSettings = (state: IState) => state.settings;

const selectRegisterCaptcha = createSelector(
    [selectSettings],
    (settings) => ({
        lang: settings.lang,
        captchaToken: settings.captchaToken,
        fQErrors: settings.fQErrors,
    })
);

export const FillingQuestCaptcha = (): JSX.Element => {
    const { lang, captchaToken, fQErrors } = useSelector(selectRegisterCaptcha);

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
                key={captchaToken}
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
