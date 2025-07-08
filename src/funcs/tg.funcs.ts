import {
  init,
  isTMA,
  initData,
  viewport,
  cloudStorage,
  swipeBehavior,
  closingBehavior,
  addToHomeScreen,
  onAddedToHomeScreen,
  checkHomeScreenStatus,
  onAddToHomeScreenFailed,
} from '@telegram-apps/sdk';

import {
  EHomeScreenStatus,
  ETgCloudeStore,
  EStatusSetHomeScreen,
  type InitHomeScreenRes,
} from '@/types/tg.types';

import { delay } from './general.funcs';
import { setTgId } from '@/config/fetch.config';


export let statusSetHomeScreen: EStatusSetHomeScreen = EStatusSetHomeScreen.Error;

export const setStatusSetHomeScreen = (value: EStatusSetHomeScreen) => {
  statusSetHomeScreen = value
};

async function isCloudStorageAvailable(retries = 5, timeout = 500): Promise<boolean> {
  let attempts = 0;
  while (attempts < retries) {
    const available =
      cloudStorage.isSupported() &&
      cloudStorage.getItem.isAvailable() &&
      cloudStorage.setItem.isAvailable() &&
      cloudStorage.deleteItem.isAvailable();

    if (available) return true;

    await delay(timeout);
    attempts++;
  }
  return false;
};

export const tgCloudStore = {
  async set<T = any>(key: ETgCloudeStore, value: T): Promise<boolean> {
    const available = await isCloudStorageAvailable();
    if (!available) return false;

    try {
      const stringified = JSON.stringify(value);
      await cloudStorage.setItem(key, stringified);
      return true;
    } catch {
      return false;
    }
  },

  async get<T = any>(key: ETgCloudeStore): Promise<T | null> {
    const available = await isCloudStorageAvailable();
    if (!available) return null;

    try {
      const raw = await cloudStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : null;
    } catch {
      return null;
    }
  },

  async delete(key: ETgCloudeStore): Promise<boolean> {
    const available = await isCloudStorageAvailable();
    if (!available) return false;

    try {
      await cloudStorage.deleteItem(key);
      return true;
    } catch {
      return false;
    }
  }
};

export async function initTg(): Promise<void> {
  if (!(await isTMA())) return;

  try { await init() } catch {};

  initData.restore();

  if (closingBehavior.mount.isAvailable()) {
    closingBehavior.mount();
  }

  if (closingBehavior.enableConfirmation.isAvailable()) {
    closingBehavior.enableConfirmation();
  }

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
};

export function getTgID(): string | null {
  const user = initData.user();

  if(!user) return null

  setTgId('' + user.id);

  return '' + user.id;
};

export function getRefParams(): string | null {
  const param = initData.startParam();
  
  if(!param) return null;

  const decoded = atob(decodeURIComponent(param));

  return decoded;
};

async function checkInstallHomeScreen(): Promise<InitHomeScreenRes> {
  if (!checkHomeScreenStatus.isAvailable()) return null;

  try {
    const status = await checkHomeScreenStatus() as EHomeScreenStatus;
    return status;
  } catch (err) {
    return 'error';
  }
};

async function toOfferHomeScreen(): Promise<void> {
  if (addToHomeScreen.isAvailable()) {
    addToHomeScreen();

    const handleSuccess = () => {
      setStatusSetHomeScreen(EStatusSetHomeScreen.Success);
    };

    onAddedToHomeScreen(handleSuccess);

    const handleFailed = () => {
      setStatusSetHomeScreen(EStatusSetHomeScreen.Error);
    };

    onAddToHomeScreenFailed(handleFailed);
  }
};

export async function setHomeScreen(): Promise<void> {
  const countRes = await tgCloudStore.get<number>(ETgCloudeStore.NumRejSetHomeScreen) || 0;

  if(countRes && countRes > 3) return;

  const response = await checkInstallHomeScreen();

  if(
    !response            ||
    response === 'error' ||
    [EHomeScreenStatus.Added, EHomeScreenStatus.Unknown].includes(response)
  ) return;

  await toOfferHomeScreen();

  setTimeout(() => {
    if(statusSetHomeScreen = EStatusSetHomeScreen.Error) {
      tgCloudStore.set<number>(ETgCloudeStore.NumRejSetHomeScreen, countRes + 1);
    }
  }, 5000);
};
