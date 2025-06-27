import { Suspense, useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { EProfileRoles } from './types/store.types';
import { toChange, toPreview, toLikes } from './config/routes.config';{ }
import { setNavigate, navigate } from './config/fetch.config';
import { initProfileAsync, getSelfProfile, getSelfPlansAsync } from '@/store/slices/profileSlice';
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
            navigate('error');
        } else if (!checkRes) {
            navigate(toPreview);
        } else {

            const [ selfRes, _ ] = await Promise.all([
                store.dispatch(getSelfProfile()).unwrap(),
                store.dispatch(getSelfPlansAsync()).unwrap(),
            ]);

            if(!selfRes || selfRes === 'error') {
                navigate('error');
            } else {
                switch(selfRes.role) {
                    case EProfileRoles.User:
                        navigate(toLikes);
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

    useEffect( () => setNavigate(navigate), [] );

    return (
        <Suspense fallback={ <AppPreloader /> } >
            <AppLazy />
        </Suspense>
    )
}

export default AppSuspense;
