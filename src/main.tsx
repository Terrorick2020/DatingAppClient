import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';
import { SNACK_COUNT, SNACK_TIMEOUT } from './constant/settings';
import { viewport, init, isTMA, swipeBehavior } from '@telegram-apps/sdk';

import store, { persistor } from './store';
import AppSuspense from './AppSuspense';


async function initTg() {
  if (await isTMA()) {
    await init();

    if (viewport.mount.isAvailable()) {
      await viewport.mount();
      viewport.expand();
    }

    if (viewport.requestFullscreen.isAvailable()) {
      await viewport.requestFullscreen();
    }

    if ( swipeBehavior.mount.isAvailable() ) {
      await swipeBehavior.mount();

      if ( swipeBehavior.isMounted() ) {
        swipeBehavior.disableVertical();
        swipeBehavior.isVerticalEnabled();
      }
    }
  }
}

(async () => { await initTg() })();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store }>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={SNACK_COUNT}
            autoHideDuration={SNACK_TIMEOUT}
          >
            <AppSuspense />
          </SnackbarProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
