<script setup lang="ts">
import { TheForm, TheCard, PrimaryButton, SecondaryButton, BaseModal } from '@/shared/ui';
import ModalAddHousehold from './ModalAddHousehold.vue';
import LinkUserItem from './LinkUserItems.vue';
import CategoryLimits from './CategoryLimits.vue';
import { useInteraction } from '../hooks/useInteraction';

const { 
    user, 
    defineField,
    errors,
    isOpenModalAddCategory, 
    isOpenModalAddHousehold,
    onClickOpenAddHouseholdModal, 
    onClickCloseAddHouseholdModal, 
    onClickOpenAddCategoryModal, 
    onClickCloseAddItemModal, 
    handleAddCategory, 
    handleAddHousehold 
} = useInteraction()

const [name, nameProps] = defineField('name')
const [limitAmount, limitAmountProps] = defineField('limitAmount')

</script>

<template>
    <TheCard>
        <div>
            <img :src="user.pictureURL" class="w-10 h-10 rounded-full" />
        </div>
        <div>
            <h1>{{ user.name }}</h1>
        </div>
    </TheCard>
    <TheCard>
        <TheForm label="家計簿">
            <TheCard>
                <TheForm label="共有しているユーザー">
                    <ul>
                        <LinkUserItem name="山田太郎" role="メンバー" />
                        <LinkUserItem name="佐藤花子" role="メンバー" />
                    </ul>
                </TheForm>
            </TheCard>
            <ul class="space-y-4">
                <li v-for="householdBook in user.householdBooks" :key="householdBook.id" class="space-y-2">
                    <div class="flex items-center justify-between">
                        <input type="text" v-model="householdBook.title"
                            class="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-none focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 px-2 py-1 rounded" />
                        <PrimaryButton>
                            更新
                        </PrimaryButton>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <TheCard>
                        <ul class="space-y-2">
                            <div class="mb-4">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">カテゴリー別予算
                                    </h3>
                                    <button
                                        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <p class="text-sm text-gray-600 dark:text-gray-400">各カテゴリーの月間予算上限を設定しています</p>
                            </div>
                            <CategoryLimits :categoryLimits="householdBook.categoryLimit" />
                            <div class="flex justify-end mt-4">
                                <PrimaryButton @click="onClickOpenAddCategoryModal">
                                    「カテゴリ」を追加
                                </PrimaryButton>
                            </div>
                        </ul>
                    </TheCard>
                </li>
                <div class="flex justify-end mt-4">
                    <PrimaryButton @click="onClickOpenAddHouseholdModal">
                        「家計簿」を追加
                    </PrimaryButton>
                </div>
            </ul>
        </TheForm>
    </TheCard>

    <!-- modal -->
    <BaseModal title="カテゴリ追加" :isOpen="isOpenModalAddCategory" @closeModal="onClickCloseAddItemModal"
    verticalPosition="top-20"
    >
        <template #modalBody>
            <TheForm label="カテゴリ名">
                <input type="text" 
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                v-model="name" 
                v-bind="nameProps" 
                :class="{ 'bg-red-50 border-red-500': errors.name }"
                />  
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.name }}</p>
            </TheForm>
            <TheForm label="上限値">
                <input type="number" 
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                v-model="limitAmount" 
                v-bind="limitAmountProps" 
                :class="{ 'bg-red-50 border-red-500': errors.limitAmount }"
                />  
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.limitAmount }}</p>
            </TheForm>
        </template>
        <template #buttons>
            <PrimaryButton @click="handleAddCategory">
                追加
            </PrimaryButton>
            <SecondaryButton @click="onClickCloseAddItemModal">
                閉じる
            </SecondaryButton>
        </template>
    </BaseModal>
    
    <ModalAddHousehold :isOpenModal="isOpenModalAddHousehold" @closeModal="onClickCloseAddHouseholdModal"
        @addHousehold="handleAddHousehold" />
</template>