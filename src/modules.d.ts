// src/modules.d.ts
declare module '*.svg' {
    import * as React from 'react'
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
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
