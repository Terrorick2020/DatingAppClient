import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { viewport, init, isTMA, swipeBehavior  } from '@telegram-apps/sdk';

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

    // await swipeBehavior.disableVertical();
  }
}

function ensureDocumentIsScrollable() {
  const isScrollable =
    document.documentElement.scrollHeight > window.innerHeight;
  if (!isScrollable) {
    document.documentElement.style.setProperty(
      "height",
      "calc(100vh + 1px)",
      "important"
    );
  }
}

function preventCollapse() {
  if (window.scrollY === 0) {
    window.scrollTo(0, 1);
  }
}


(async () => { await initTg() })();

const scrollableElement = document.querySelector(".scrollable-element");
if ( scrollableElement ) scrollableElement.addEventListener("touchstart", preventCollapse);
window.addEventListener("load", ensureDocumentIsScrollable);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <AppSuspense />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
