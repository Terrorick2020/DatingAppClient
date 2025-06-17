import { Suspense, useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { EProfileRoles } from './types/store.types';
import { toChange, toPreview, toSlider } from './config/routes.config';{ }
import { setNavigate, navigate } from './config/fetch.config';
import { initProfileAsync, getSelfProfile, getSelfPlansAsync } from '@/store/slices/profileSlice';
import { delay, fadeOutPreloader } from './funcs/general.funcs';

import store from './store';
import AppPreloader from './components/AppPreloader';


async function delayForLazy( promise: Promise<any> ) {
    const start = performance.now();

    const [response, selfRes, _, resPromise] = await Promise.all([
        store.dispatch(initProfileAsync()).unwrap(),
        store.dispatch(getSelfProfile()).unwrap(),
        store.dispatch(getSelfPlansAsync()).unwrap(),
        promise,
    ]);

    if(navigate) {
        if(response === 'error') {
            navigate('error');
        } else if (response === null) {
            navigate(toPreview);
        } else if (selfRes && selfRes !== 'error') {
            switch(selfRes.role) {
                case EProfileRoles.User:
                    navigate(toSlider);
                    break;
                case EProfileRoles.Admin:
                    navigate(toChange);
                    break;
                case EProfileRoles.Psych:
                    navigate('error');
                    break;
            }
        }
    }

    const elapsed = performance.now() - start;
    const remainingDelay = Math.max(0, 2000 - elapsed);

    if (remainingDelay > 0) await delay(remainingDelay);

    await fadeOutPreloader();

    return resPromise;
}

const AppLazy = lazy(() => delayForLazy(import('./App')));

const AppSuspense = () => {
    const navigate = useNavigate();

    useEffect( () => setNavigate(navigate), [] )

    return (
        <Suspense fallback={ <AppPreloader /> } >
            <AppLazy />
        </Suspense>
    )
}

export default AppSuspense;
