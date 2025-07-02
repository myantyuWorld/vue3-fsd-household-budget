import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeeklySummaryCard from '../WeeklySummaryCard.vue'
import type { components } from '@/shared/api/v1'

describe('WeeklySummaryCard', () => {
  it('週次データが正しく表示される', () => {
    const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
      weekStart: '2024-01-01',
      weekEnd: '2024-01-07',
      totalAmount: 15000,
      items: [
        { id: '1', date: '2024-01-02', tag: '食費', amount: 8000 },
        { id: '2', date: '2024-01-05', tag: '日用品', amount: 7000 }
      ]
    }

    const wrapper = mount(WeeklySummaryCard, {
      props: {
        weeklySummary: mockWeeklySummary,
        currentDate: new Date('2024-01-01')
      }
    })

    // 週の範囲が正しく表示されること
    expect(wrapper.text()).toContain('1/1 - 1/7')
    
    // 金額が正しくフォーマットされて表示されること
    expect(wrapper.text()).toContain('¥15,000')
    
    // アイテム数が表示されること
    expect(wrapper.text()).toContain('2件の支出')
  })

  it('データがnullの場合でも正常に表示される', () => {
    const wrapper = mount(WeeklySummaryCard, {
      props: {
        weeklySummary: null,
        currentDate: new Date('2024-01-01')
      }
    })

    // エラーが発生しないこと
    expect(wrapper.exists()).toBe(true)
    
    // 空の範囲が表示されること
    expect(wrapper.text()).toContain('')
    
    // 金額が0で表示されること
    expect(wrapper.text()).toContain('¥0')
  })

  it('アイテムが空の場合、アイテム数が表示されない', () => {
    const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
      weekStart: '2024-01-01',
      weekEnd: '2024-01-07',
      totalAmount: 0,
      items: []
    }

    const wrapper = mount(WeeklySummaryCard, {
      props: {
        weeklySummary: mockWeeklySummary,
        currentDate: new Date('2024-01-01')
      }
    })

    // アイテム数のテキストが表示されないこと
    expect(wrapper.text()).not.toContain('件の支出')
  })

  it('大きな金額が正しくフォーマットされる', () => {
    const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
      weekStart: '2024-01-01',
      weekEnd: '2024-01-07',
      totalAmount: 1234567,
      items: []
    }

    const wrapper = mount(WeeklySummaryCard, {
      props: {
        weeklySummary: mockWeeklySummary,
        currentDate: new Date('2024-01-01')
      }
    })

    // カンマ区切りで正しく表示されること
    expect(wrapper.text()).toContain('¥1,234,567')
  })

  it('月をまたぐ週の範囲が正しく表示される', () => {
    const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
      weekStart: '2024-01-29',
      weekEnd: '2024-02-04',
      totalAmount: 5000,
      items: []
    }

    const wrapper = mount(WeeklySummaryCard, {
      props: {
        weeklySummary: mockWeeklySummary,
        currentDate: new Date('2024-01-01')
      }
    })

    // 月をまたぐ範囲が正しく表示されること
    expect(wrapper.text()).toContain('1/29 - 2/4')
  })

  it('weekStartまたはweekEndが未定義の場合、空文字が表示される', () => {
    const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
      weekStart: undefined,
      weekEnd: undefined,
      totalAmount: 5000,
      items: []
    }

    const wrapper = mount(WeeklySummaryCard, {
      props: {
        weeklySummary: mockWeeklySummary,
        currentDate: new Date('2024-01-01')
      }
    })

    // 範囲が空文字で表示されること
    expect(wrapper.find('.text-sm.text-gray-500').text()).toBe('')
  })

  it('正しいCSSクラスが適用される', () => {
    const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
      weekStart: '2024-01-01',
      weekEnd: '2024-01-07',
      totalAmount: 15000,
      items: []
    }

    const wrapper = mount(WeeklySummaryCard, {
      props: {
        weeklySummary: mockWeeklySummary,
        currentDate: new Date('2024-01-01')
      }
    })

    // メインコンテナのクラスが正しく適用されること
    expect(wrapper.find('.bg-white\\/90').exists()).toBe(true)
    expect(wrapper.find('.rounded-xl').exists()).toBe(true)
    expect(wrapper.find('.shadow-lg').exists()).toBe(true)
  })

  describe('週の移動機能', () => {
    it('前の週ボタンが表示され、クリックイベントが発生する', async () => {
      const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
        weekStart: '2024-02-01',
        weekEnd: '2024-02-07',
        totalAmount: 15000,
        items: []
      }

      const wrapper = mount(WeeklySummaryCard, {
        props: {
          weeklySummary: mockWeeklySummary,
          currentDate: new Date('2024-02-08')
        }
      })

      const buttons = wrapper.findAll('button')
      const prevButton = buttons[0]
      expect(prevButton.exists()).toBe(true)
      expect(prevButton.attributes('disabled')).toBeUndefined()
      
      await prevButton.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('week-prev')
    })

    it('次の週ボタンが表示され、クリックイベントが発生する', async () => {
      const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
        weekStart: '2024-01-01',
        weekEnd: '2024-01-07',
        totalAmount: 15000,
        items: []
      }

      const wrapper = mount(WeeklySummaryCard, {
        props: {
          weeklySummary: mockWeeklySummary,
          currentDate: new Date('2024-01-01')
        }
      })

      const buttons = wrapper.findAll('button')
      const nextButton = buttons[1]
      expect(nextButton.exists()).toBe(true)
      
      await nextButton.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('week-next')
    })

    it('現在の週が今日の週の場合、次の週ボタンが無効になる', () => {
      const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
        weekStart: '2024-01-01',
        weekEnd: '2024-01-07',
        totalAmount: 15000,
        items: []
      }

      const today = new Date()
      const wrapper = mount(WeeklySummaryCard, {
        props: {
          weeklySummary: mockWeeklySummary,
          currentDate: today
        }
      })

      const buttons = wrapper.findAll('button')
      const nextButton = buttons[1]
      expect(nextButton.attributes('disabled')).toBeDefined()
    })

    it('2024年1月1日より前の週の場合、前の週ボタンが無効になる', () => {
      const mockWeeklySummary: components['schemas']['WeeklySummary'] = {
        weekStart: '2023-12-25',
        weekEnd: '2023-12-31',
        totalAmount: 15000,
        items: []
      }

      const wrapper = mount(WeeklySummaryCard, {
        props: {
          weeklySummary: mockWeeklySummary,
          currentDate: new Date('2024-01-01')
        }
      })

      const buttons = wrapper.findAll('button')
      const prevButton = buttons[0]
      expect(prevButton.attributes('disabled')).toBeDefined()
    })
  })
})