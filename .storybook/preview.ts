import type { Preview } from '@storybook/vue3'
import { withActions } from '@storybook/addon-actions/decorator'
import { initialize, mswDecorator, mswLoader } from 'msw-storybook-addon'
import { createPinia } from 'pinia'
import '../src/index.css'

// MSWの初期化
initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    interactions: {
      disable: false,
    },
    msw: {
      handlers: [], // グローバルなハンドラーをここに追加できます
    },
    viewport: {
      defaultViewport: 'mobile3',
      viewports: {
        mobile1: {
          name: 'iPhone SE',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobile2: {
          name: 'iPhone 12 Pro',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        mobile3: {
          name: 'iPhone 14 Pro Max',
          styles: {
            width: '428px',
            height: '926px',
          },
        },
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    (story) => {
      const pinia = createPinia()
      return {
        setup() {
          return { story }
        },
        template: '<story />',
        global: {
          plugins: [pinia],
        },
      }
    },
    withActions,
    mswDecorator,
  ],
}

export default preview
