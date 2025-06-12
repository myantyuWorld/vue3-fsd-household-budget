import { type Meta, type StoryObj } from '@storybook/vue3'
import Component from './InformationItem.vue'

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    information: {
      id: 1,
      title: '😃AIとのチャット機能が追加されました',
      content:
        'あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
      isRead: false,
      category: 'bug_report',
    },
  },
}

export const Secondar: Story = {
  args: {
    information: {
      id: 1,
      title: 'test',
      content:
        'ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
      isRead: true,
      category: 'feature_request',
    },
  },
}

export const Third: Story = {
  args: {
    information: {
      id: 1,
      title: 'test',
      content:
        'ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
      isRead: true,
      category: 'other',
    },
  },
}
