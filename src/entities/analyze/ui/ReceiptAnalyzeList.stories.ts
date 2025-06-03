import { type Meta, type StoryObj } from '@storybook/vue3'
import Component from './ReceiptAnalyzeList.vue'

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  args: {
    receiptAnalyzes: [
      {
        id: '1',
        receiptImageURL:
          'https://www.isp21.co.jp/wp-content/uploads/solution/library/library02-1.jpg',
        analyzeStatus: 'finished',
        transferStatus: 'finished',
        date: '2021-01-01',
        totalAmount: 99999,
        items: [
          {
            name: 'Item 1',
            price: 100,
          },
        ],
      },
      {
        id: '2',
        receiptImageURL:
          'https://www.isp21.co.jp/wp-content/uploads/solution/library/library02-1.jpg',
        analyzeStatus: 'finished',
        transferStatus: 'pending',
        date: '2021-01-01',
        totalAmount: 99999,
        items: [
          {
            name: 'Item 1',
            price: 100,
          },
          {
            name: 'ああああああああああ',
            price: 9999,
          },
          {
            name: 'Item 3',
            price: 300,
          },
        ],
      },
      {
        id: '3',
        receiptImageURL:
          'https://www.isp21.co.jp/wp-content/uploads/solution/library/library02-1.jpg',
        analyzeStatus: 'pending',
        transferStatus: 'pending',
        date: '2021-01-01',
        totalAmount: 99999,
        items: [],
      },
    ],
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}
