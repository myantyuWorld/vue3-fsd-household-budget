import type { Preview } from '@storybook/vue3'
import { withActions } from '@storybook/addon-actions/decorator'
import { initialize } from 'msw-storybook-addon'
import "../src/index.css"

// MSWの初期化
initialize()

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
  },
  decorators: [withActions],
}

export default preview
