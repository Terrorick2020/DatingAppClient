import {
    toChange,
    toPreview,
    toSlider,
    toError,
    toProfile,
    toBlocked,
} from './config/routes.config';

import {
    initProfileAsync,
    getSelfProfile,
    getSelfPlansAsync,
} from '@/store/slices/profileSlice';

import { Suspense, useLayoutEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { EProfileRoles, EProfileStatus, type IState } from './types/store.types';
import { setNavigate, navigate } from './config/fetch.config';
import { delay, fadeOutPreloader } from './funcs/general.funcs';

import store from './store';
import AppPreloader from './components/AppPreloader';


async function delayForLazy( promise: Promise<any> ) {
    const start = performance.now();

    const [ checkRes, jsxRes ] = await Promise.all([
        store.dispatch(initProfileAsync()).unwrap(),
        promise,
    ]);

    if(navigate) {
        if(checkRes === 'error' || !jsxRes) {
            navigate(toError);
        } else if (!checkRes) {
            navigate(toPreview);
        } else if (checkRes === EProfileStatus.Blocked) {
            navigate(toBlocked);
        } else {

            const rootState = store.getState() as IState;
            const profileRole = rootState.profile.info.role;
            const isPsych = profileRole === EProfileRoles.Psych;

            const [ selfRes, _ ] = await Promise.all(
                isPsych
                    ? [
                        store.getState().profile.info,
                        null,
                    ] : [
                        store.dispatch(getSelfProfile()).unwrap(),
                        store.dispatch(getSelfPlansAsync()).unwrap(),
                    ]
            );

            if(!selfRes || selfRes === 'error') {
                navigate(toError);
            } else {
                switch(selfRes.role) {
                    case EProfileRoles.User:
                        navigate(toSlider);
                        break;
                    case EProfileRoles.Admin:
                        navigate(toChange);
                        break;
                    case EProfileRoles.Psych:
                        navigate(toProfile);
                        break;
                }
            }
        }
    }

    const elapsed = performance.now() - start;
    const remainingDelay = Math.max(0, 2000 - elapsed);

    if (remainingDelay > 0) await delay(remainingDelay);

    await fadeOutPreloader();

    return jsxRes;
}

const AppLazy = lazy(() => delayForLazy(import('./App')));

const AppSuspense = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        setNavigate(navigate);
    }, []);

    return (
        <Suspense fallback={ <AppPreloader /> } >
            <AppLazy />
        </Suspense>
    )
}

export default AppSuspense;
