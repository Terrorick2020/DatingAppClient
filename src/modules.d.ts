// src/modules.d.ts
declare module '*.svg' {
    import * as React from 'react'
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
};

declare module 'virtual:pwa-register' {
  type RegisterSWOptions = {
    onNeedRefresh?: (sw: any) => void;
    onOfflineReady?: () => void;
  };

  function registerSW(options?: RegisterSWOptions): () => void;

  export { registerSW };
  export default registerSW;
};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        close: () => void;
        initData?: string;
        initDataUnsafe?: Record<string, any>;
        sendData?: (data: string) => void;
        expand?: () => void;
        isExpanded?: boolean;
        isClosingConfirmationEnabled?: boolean;
        enableClosingConfirmation?: () => void;
        disableClosingConfirmation?: () => void;
        onEvent?: (eventType: string, callback: () => void) => void;
        offEvent?: (eventType: string, callback: () => void) => void;
        themeParams?: Record<string, any>;
        viewportHeight?: number;
        headerColor?: string;
        backgroundColor?: string;
      };
    };
  }
};
