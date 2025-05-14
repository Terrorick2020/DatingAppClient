import { viewport, init, isTMA, swipeBehavior } from '@telegram-apps/sdk';


export async function initTg() {
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
