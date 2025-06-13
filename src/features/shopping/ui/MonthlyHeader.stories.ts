import { type Meta, type StoryObj } from '@storybook/vue3'
import Component from './MonthlyHeader.vue'

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    operatingCurrentDate: new Date(),
    summarizeAmount: 10000,
    summarizeCategoryLimitAmount: 10000
  }
}
