import {
  init,
  isTMA,
  viewport,
  cloudStorage,
  swipeBehavior,
  requestContact,
  addToHomeScreen,
  onAddedToHomeScreen,
  checkHomeScreenStatus,
  onAddToHomeScreenFailed,
} from '@telegram-apps/sdk';

import {
  EHomeScreenStatus,
  type InitHomeScreenRes,
} from '@/types/tg.types';

import { delay } from './general.funcs';


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
  if (!(await isTMA())) return;

  try { await init() } catch {};

  if (viewport.mount.isAvailable()) {
    const mountPromise = viewport.mount({ timeout: 3000 });

    await mountPromise.catch(() => {});
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

export async function getTgID(): Promise<string | null> {
  const contact = await requestContact();

  return '' + contact.contact.user_id;
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
