import {
  init,
  isTMA,
  viewport,
  cloudStorage,
  swipeBehavior,
  addToHomeScreen,
  onAddedToHomeScreen,
  checkHomeScreenStatus,
  onAddToHomeScreenFailed,
} from '@telegram-apps/sdk';

import {
  EHomeScreenStatus,
  type InitHomeScreenRes
} from '@/types/tg.types';

import { delay } from './general.funcs';
import type { WebAppUser } from '@/types/profile.types';


async function isWorkedCloudeStore(): Promise<boolean> {
  let attempts = 0;
  let ready: boolean = false;

  while (attempts < 5) {
    ready = cloudStorage.isSupported() &&
      cloudStorage.getItem.isAvailable() &&
      cloudStorage.setItem.isAvailable() &&
      cloudStorage.deleteItem.isAvailable();

    if(ready) return ready;

    await delay(500);
    
    attempts++;
  }

  return ready;
}

export async function initTg(): Promise<void> {
  let isTg: boolean = false;
  const maxAttempts = 5;
  const retryDelay = 100;
  
  isTg = await isTMA();

  if(!isTg) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      isTg = await isTMA();

      if (isTg) break;

      await delay(retryDelay);
    }
  }

  await init();

  if (viewport.mount.isAvailable()) {
    await viewport.mount();
    viewport.expand();
  }

  if (viewport.requestFullscreen.isAvailable()) {
    await viewport.requestFullscreen();
  }

  if (swipeBehavior.mount.isAvailable()) {
    await swipeBehavior.mount();

    if (swipeBehavior.isMounted()) {
      swipeBehavior.disableVertical();
      swipeBehavior.isVerticalEnabled();
    }
  }

  await isWorkedCloudeStore();
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

async function checkInstallHomeScreen(): Promise<InitHomeScreenRes> {
  if (!checkHomeScreenStatus.isAvailable()) return null;

  try {
    const status = await checkHomeScreenStatus() as EHomeScreenStatus;
    return status;
  } catch (err) {
    return 'error';
  }
}

async function toOfferHomeScreen(): Promise<void> {
  if (addToHomeScreen.isAvailable()) {
    addToHomeScreen();

    const handleSuccess = () => {
      console.log( 'hello' )
    }

    onAddedToHomeScreen(handleSuccess);

    const handleFailed = () => {
      console.log( 'UnHello' )
    }

    onAddToHomeScreenFailed(handleFailed);
  }
}

export async function setHomeScreen(): Promise<void> {
  const response = await checkInstallHomeScreen();

  if(!response || response === 'error') return;

  switch(response) {
    case EHomeScreenStatus.Added:
      return;
    case EHomeScreenStatus.NotAdded:
      toOfferHomeScreen();
      break;
    case EHomeScreenStatus.Unknown:
      break;
  }
}
