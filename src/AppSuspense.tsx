import { Suspense, lazy } from 'react'
import { initProfileAsync } from '@/store/slices/profileSlice'

import store from './store'

import AppPreloader from './components/AppPreloader'


function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayForLazy( promise: Promise<any> ) {
    await delay(2000)

    await store.dispatch( initProfileAsync( window.location.href ) )

    const resPromise = await promise

    const preloader = document.getElementById( 'preloader' )

    if ( preloader ) {
        preloader.style.animation = "fadeOut 2s ease-in-out forwards"

        await delay(2000)

        preloader.style.display = "none"
    }

    return resPromise
}

const AppLazy = lazy(() => delayForLazy(import('./App')))

const AppSuspense = () => {
    return (
        <>
            <Suspense fallback={ <AppPreloader /> } >
                <AppLazy />
            </Suspense>
        </>
    )
}

export default AppSuspense
