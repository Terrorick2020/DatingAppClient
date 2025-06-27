import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initTg } from './funcs/tg.funcs';
import { SNACK_COUNT, SNACK_TIMEOUT } from './constant/settings';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import AppSuspense from './AppSuspese';
import store from './store';


(() => { initTg() });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <SnackbarProvider
              maxSnack={SNACK_COUNT}
              autoHideDuration={SNACK_TIMEOUT}
          >
              <AppSuspense />
          </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
