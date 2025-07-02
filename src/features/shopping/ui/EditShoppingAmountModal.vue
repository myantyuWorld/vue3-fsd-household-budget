<script setup lang="ts">
  import { BaseModal, PrimaryButton, SecondaryButton } from '@/shared/ui'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { PUT } from '@/shared/api'
  import {
    schema,
    type KaimemoSummarySchema
  } from '@/pages/kaimemo-summary/types'
  import type { components } from '@/shared/api/v1'
  import { watch } from 'vue'

  const props = defineProps<{
    isOpen: boolean
    householdID: number
    categories: components['schemas']['CategoryLimit'][]
    shoppingRecord: components['schemas']['ShoppingRecord'] | null
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const { defineField, errors, handleSubmit, resetForm, setValues } =
    useForm<KaimemoSummarySchema>({
      validationSchema: toTypedSchema(schema)
    })

  const [amount, amountProps] = defineField('amount')
  const [tag, tagProps] = defineField('tag')
  const [date, dateProps] = defineField('date')
  const [memo, memoProps] = defineField('memo')

  // propsが変更されたときにフォームを初期化
  watch(
    () => props.shoppingRecord,
    (newRecord) => {
      if (newRecord && props.isOpen) {
        setValues({
          amount: newRecord.amount,
          tag: newRecord.category.id,
          date: newRecord.date,
          memo: newRecord.memo || ''
        })
      }
    },
    { immediate: true }
  )

  const onClickUpdateShoppingRecord = handleSubmit(async values => {
    if (!props.shoppingRecord) return

    console.log(values)

    const { error } = await PUT('/household/{householdID}/shopping/record/{shoppingID}', {
      body: {
        categoryID: values.tag,
        amount: values.amount,
        date: values.date,
        memo: values.memo ?? ''
      },
      params: {
        path: {
          householdID: props.householdID,
          shoppingID: props.shoppingRecord.id
        }
      }
    })

    if (error) {
      console.error(error)
      return
    }

    resetForm()
    emit('close')
  })
</script>

<template>
  <BaseModal
    title="金額編集"
    :isOpen="props.isOpen"
    @closeModal="emit('close')"
    class="backdrop-blur-md"
    verticalPosition="top-0"
    horizontalPosition="left-0"
  >
    <template #modalBody>
      <div class="bg-gradient-to-br from-primary-bg to-white/50 rounded-2xl">
        <TheForm label="日付">
          <input
            type="date"
            placeholder="支出日を選択してください"
            class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
            :class="{
              'border-red-500 bg-red-50/80': errors.date
            }"
            v-model="date"
            v-bind="dateProps"
          />
          <p class="mt-2 text-sm text-red-600">
            {{ errors.date }}
          </p>
        </TheForm>

        <TheForm label="カテゴリ">
          <select
            class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
            :class="{
              'border-red-500 bg-red-50/80': errors.tag
            }"
            v-model="tag"
            v-bind="tagProps"
          >
            <option value="" disabled>カテゴリを選択してください</option>
            <template
              v-for="categoryLimit in categories"
              :key="categoryLimit.category.id"
            >
              <option :value="categoryLimit.category.id">
                {{ categoryLimit.category.name }}
              </option>
            </template>
          </select>
          <p class="mt-2 text-sm text-red-600">
            {{ errors.tag }}
          </p>
        </TheForm>

        <TheForm label="金額">
          <input
            type="number"
            placeholder="金額を入力してください（例：1000）"
            class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 text-base"
            :class="{
              'border-red-500 bg-red-50/80': errors.amount
            }"
            v-model="amount"
            v-bind="amountProps"
          />
          <p class="mt-2 text-sm text-red-600">
            {{ errors.amount }}
          </p>
        </TheForm>

        <TheForm label="メモ">
          <textarea
            placeholder="メモを入力してください（任意）"
            class="w-full p-4 border border-primary-light rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light bg-white/90 min-h-[100px] text-base"
            :class="{
              'border-red-500 bg-red-50/80': errors.memo
            }"
            v-model="memo"
            v-bind="memoProps"
          />
          <p class="mt-2 text-sm text-red-600">
            {{ errors.memo }}
          </p>
        </TheForm>
      </div>
    </template>

    <template #buttons>
      <div class="flex justify-end gap-4">
        <SecondaryButton
          @click="emit('close')"
          class="px-6 py-3 rounded-xl hover:bg-primary-bg transition-all duration-300 transform hover:scale-105"
        >
          キャンセル
        </SecondaryButton>
        <PrimaryButton
          @click="onClickUpdateShoppingRecord"
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-lg"
        >
          更新
        </PrimaryButton>
      </div>
    </template>
  </BaseModal>
</template>