import { type Meta, type StoryObj } from '@storybook/vue3'
import Component from './MonthlySummaryTile.vue'

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  args: {
    tag: '食費',
    currentExpense: 10000,
    availableAmount: 50000,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
