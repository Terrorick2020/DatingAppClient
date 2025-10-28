import { JSX } from 'react';
import { SmartCaptcha } from '@yandex/smart-captcha';
import { createSelector } from 'reselect';
import { useDispatch } from 'react-redux';
import { dfltErrItem } from '@/constant/settings';
import { v4 as uuidv4 } from 'uuid';
import { setFQErrors } from '@/store/slices/settingsSlice';
import { setCaptcaToken } from '@/store/slices/settingsSlice';
import { CAPTURE_KEY, CAPTURE_MODE } from '@/config/env.config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toError } from '@/config/routes.config';
import type { ICaptchaWidget } from '@/types/register.typs';
import type { RootDispatch } from '@/store';
import type { IState } from '@/types/store.types';


const selectSettings = (state: IState) => state.settings;

const selectRegisterCaptcha = createSelector(
    [selectSettings],
    (settings) => ({
        lang: settings.lang,
        fQErrors: settings.fQErrors,
    })
);

export const FillingQuestCaptcha = (props: ICaptchaWidget): JSX.Element => {
    const { lang, fQErrors } = useSelector(selectRegisterCaptcha);

    const disatch = useDispatch<RootDispatch>();
    const navigate = useNavigate();

    const handleNetworkError = (): void => {
        navigate(toError);
        props.setKey(uuidv4());
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
        props.setKey(uuidv4());
    }; 

    return (
        <div className="widgets__captcha">
            <SmartCaptcha
                key={props.key}
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
