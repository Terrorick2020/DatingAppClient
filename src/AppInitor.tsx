import { JSX, ComponentType, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist';
import { createAppStore } from './store';
import { initTg } from './funcs/tg.funcs';
import { delay, fadeOutPreloader } from './funcs/general.funcs';
import { SNACK_COUNT, SNACK_TIMEOUT } from './constant/settings';

import AppPreloader from './components/AppPreloader';


const AppInit = (): JSX.Element => {
    const [persistor, setPersistor] = useState<Persistor | null>(null);
    const [store, setStore] = useState<ReturnType<typeof createAppStore>['baseStore'] | null>(null);
    const [AppComponent, setAppComponent] = useState<ComponentType | null>(null);

    useEffect(
        () => {(async () => {
            await delay(2000);
            await initTg();

            const { baseStore, basePersistor } = createAppStore();

            setStore(baseStore);
            setPersistor(basePersistor);

            const { default: ImportedApp } = await import('./App');

            await fadeOutPreloader();

            setAppComponent(() => ImportedApp);
        })()}, []
    );

    if(!store || !persistor || !AppComponent) return (
        <AppPreloader />
    );

    return (
        <>
            <Provider store={ store }>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                    <SnackbarProvider
                        maxSnack={SNACK_COUNT}
                        autoHideDuration={SNACK_TIMEOUT}
                    >
                        <AppComponent />
                    </SnackbarProvider>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </>
    )
};

export default AppInit;
