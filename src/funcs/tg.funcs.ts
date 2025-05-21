import {
    init,
    isTMA, 
    viewport, 
    cloudStorage,
    swipeBehavior
} from '@telegram-apps/sdk';

import { delay } from './general.funcs';


export async function isWorkedCloudeStore(): Promise<void> {
    let attempts = 0;
    while (attempts < 5) {
        const is = cloudStorage.isSupported() &&
            cloudStorage.getItem.isAvailable() &&
            cloudStorage.setItem.isAvailable() &&
            cloudStorage.deleteItem.isAvailable()

        if(is) return;

        await delay(500);
        
        attempts++;
    }

    return;
}

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

    await isWorkedCloudeStore();
  }
}
