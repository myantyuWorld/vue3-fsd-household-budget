import { type Meta, type StoryObj } from '@storybook/vue3'
import Component from './WeeklySummaryTile.vue'

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  args: {
    weeklySummary: {
      weekStart: '2023-07-10',
      weekEnd: '2023-07-10',
      totalAmount: 1000,
      items: [
        {
          id: '1',
          date: '2023-07-10',
          tag: '食費',
          amount: 0,
        },
        {
          id: '1',
          date: '2023-07-10',
          tag: '日用品',
          amount: 9999,
        },
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
