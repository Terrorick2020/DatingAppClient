import {
    init,
    isTMA, 
    viewport, 
    cloudStorage,
    swipeBehavior
} from '@telegram-apps/sdk';

import { delay } from './general.funcs';
import type { WebAppUser } from '@/types/profile.types';


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


export function getTgID(): string | null {
  const data = window.location.href;
  const url = new URL(data);
  const params = new URLSearchParams(url.hash.substring(1));
  const tgData = params.get('tgWebAppData');

  if (!tgData) return null;

  const parsedData = Object.fromEntries(new URLSearchParams(tgData));

  if(!parsedData.user) return null;

  const user: WebAppUser = JSON.parse(parsedData.user);

  return String(user.id);
}

export function getRefParams(): string | null {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe) {
    return window.Telegram.WebApp.initDataUnsafe.start_param || null;
  }
  return null;
}
