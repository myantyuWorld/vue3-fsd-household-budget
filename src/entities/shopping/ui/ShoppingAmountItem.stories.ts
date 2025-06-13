import { type Meta, type StoryObj } from '@storybook/vue3'
import Component from './ShoppingAmountItem.vue'

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    shoppingRecord: {
      id: 1,
      amount: 11000,
      date: '2021-01-01',
      memo: 'テスト',
      category: {
        id: 1,
        name: 'テスト',
        color: '#000000'
      },
      analyze_id: 1,
      receipt_analyze_results: {
        id: 1,
        totalAmount: 11000,
        receiptImageURL: 'test.jpg',
        items: []
      }
    }
  }
}

export const NoAnalyze: Story = {
  args: {
    shoppingRecord: {
      id: 1,
      amount: 1000,
      date: '2021-01-01',
      memo: 'テストホゲホゲホゲホゲ',
      category: {
        id: 1,
        name: '食費',
        color: '#000000'
      },
      analyze_id: 0,
      receipt_analyze_results: {
        id: 1,
        totalAmount: 1000,
        receiptImageURL: 'test.jpg',
        items: []
      }
    }
  }
}
