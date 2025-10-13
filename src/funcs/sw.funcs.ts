import { registerSW } from 'virtual:pwa-register';


export const updateSW = registerSW({
  onNeedRefresh(sw) {
    console.log('Доступна новая версия приложения. Старт обновления!');
    sw?.update?.();
  },
  onOfflineReady() {
    console.log("Приложение готово к оффлайн-режиму");
  }
});
