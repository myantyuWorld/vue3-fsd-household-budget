import type { Meta, StoryObj } from '@storybook/vue3'
import WeeklySummaryCard from './WeeklySummaryCard.vue'
import type { components } from '@/shared/api/v1'

const meta: Meta<typeof WeeklySummaryCard> = {
  title: 'Entities/Shopping/WeeklySummaryCard',
  component: WeeklySummaryCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    weeklySummary: {
      description: '週次支出サマリーデータ'
    },
    currentDate: {
      description: '現在の操作対象日'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
  weekStart: '2024-01-01',
  weekEnd: '2024-01-07',
  totalAmount: 15000,
  items: [
    { id: '1', date: '2024-01-02', tag: '食費', amount: 8000 },
    { id: '2', date: '2024-01-05', tag: '日用品', amount: 7000 }
  ]
}

export const Default: Story = {
  args: {
    weeklySummary: mockWeeklySummary,
    currentDate: new Date('2024-01-01')
  }
}

export const HighAmount: Story = {
  args: {
    weeklySummary: {
      ...mockWeeklySummary,
      totalAmount: 50000
    },
    currentDate: new Date('2024-01-01')
  }
}

export const NoData: Story = {
  args: {
    weeklySummary: null,
    currentDate: new Date('2024-01-01')
  }
}

export const CurrentWeek: Story = {
  args: {
    weeklySummary: {
      ...mockWeeklySummary,
      weekStart: new Date().toISOString().split('T')[0],
      weekEnd: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    currentDate: new Date()
  }
}