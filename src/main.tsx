import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { viewport, init, isTMA } from '@telegram-apps/sdk';

import store from './store';

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

    window.Telegram.WebApp.disableVerticalSwipes();

    if (window.Telegram.WebApp.enableClosingConfirmation) {
      window.Telegram.WebApp.enableClosingConfirmation();
    }

    const preventSwipe = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", preventSwipe, { passive: false });

    const preventSwipeBack = (e: TouchEvent) => {
      if (e.changedTouches[0]?.clientX > 40) e.preventDefault();
    };
    window.addEventListener("touchmove", preventSwipeBack, { passive: false });

    window.addEventListener("beforeunload", () => {
      document.removeEventListener("touchmove", preventSwipe);
      window.removeEventListener("touchmove", preventSwipeBack);
    });
  }
}


(async () => { await initTg() })();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <AppSuspense />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
