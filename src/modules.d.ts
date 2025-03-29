// src/modules.d.ts
declare module '*.svg' {
    import * as React from 'react'
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
}

declare module '@telegram-apps/sdk'

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void
        isClosingConfirmationEnabled: boolean

        close: () => void
        setupSwipeBehavior: (arg: boolean) => void
        disableVerticalSwipes: () => void
        enableClosingConfirmation: () => void
        BackButton: {
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
        }
      }
    }
  }
}

export {}
