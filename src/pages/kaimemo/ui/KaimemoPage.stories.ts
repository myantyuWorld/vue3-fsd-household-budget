import { type Meta, type StoryObj } from '@storybook/vue3'
import { within, expect, userEvent } from '@storybook/test'
import { VueQueryPlugin, QueryClient, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { http, HttpResponse } from 'msw'
import { initialize, mswLoader } from 'msw-storybook-addon'
import Component from './KaimemoPage.vue'

// MSWの初期化
initialize()

const queryClient = new QueryClient()
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient
}

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      plugins: [[VueQueryPlugin, vueQueryPluginOptions]],
      template: '<story />'
    })
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('/api/items', () => {
          return HttpResponse.json([
            { id: '1', name: '牛乳', tag: '食費', done: false },
            { id: '2', name: 'パン', tag: '食費', done: false },
            { id: '3', name: '洗剤', tag: '日用品', done: false }
          ])
        })
      ]
    }
  },
  loaders: [mswLoader]
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // モーダルを開くボタンをクリック
    const openModalButton = await canvas.getByRole('button', { name: /追加/i })
    await userEvent.click(openModalButton)

    // モーダルが表示されることを確認
    const modal = await canvas.getByRole('dialog')
    expect(modal).toBeVisible()

    // フォームに入力
    const nameInput = await canvas.getByLabelText(/商品名/i)
    await userEvent.type(nameInput, 'テスト商品')

    const tagSelect = await canvas.getByLabelText(/タグ/i)
    await userEvent.selectOptions(tagSelect, '食費')

    // 保存ボタンをクリック
    const saveButton = await canvas.getByRole('button', { name: /保存/i })
    await userEvent.click(saveButton)

    // モーダルが閉じることを確認
    expect(modal).not.toBeVisible()

    // 新しいアイテムがリストに追加されることを確認
    const items = await canvas.findAllByRole('listitem')
    expect(items).toHaveLength(4) // 初期の3つ + 新規追加の1つ
  }
}
