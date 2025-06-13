import { type Meta, type StoryObj } from '@storybook/vue3'
import Component from './ShoppingCategoryBudgetRemain.vue'

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  args: {
    categoryAmount: {
      category: {
        id: 1,
        name: '食費',
        color: '#000000'
      },
      amount: 10000,
      limitAmount: 10000
    },
    limitAmount: 10000
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
