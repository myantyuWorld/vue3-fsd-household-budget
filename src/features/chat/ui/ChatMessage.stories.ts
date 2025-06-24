import { type Meta, type StoryObj } from '@storybook/vue3'
import Component from './ChatMessage.vue'

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    message: {
      id: 1,
      user_id: 1,
      user_name: 'John Doe',
      content: 'Hello, how are you?',
      message_type: 'user',
      created_at: '2021-01-01T00:00:00Z'
    }
  }
}

export const Second: Story = {
  args: {
    message: {
      id: 2,
      user_id: 2,
      user_name: 'AI Assistant',
      content: 'I am fine, thank you!',
      message_type: 'ai',
      created_at: '2021-01-01T00:00:00Z'
    }
  }
}
