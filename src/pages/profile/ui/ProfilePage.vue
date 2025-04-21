<script setup lang="ts">
import { TheForm, TheCard, PrimaryButton, SecondaryButton, BaseModal } from '@/shared/ui';
import ModalAddHousehold from './ModalAddHousehold.vue';
import LinkUserItem from './LinkUserItems.vue';
import CategoryLimits from './CategoryLimits.vue';
import { useInteraction } from '../hooks/useInteraction';
import ShareIcon from '@/shared/ui/icons/ShareIcon.vue';

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
    handleAddHousehold,
    handleShareHouseHoldLink,
} = useInteraction()

const [name, nameProps] = defineField('name')
const [limitAmount, limitAmountProps] = defineField('limitAmount')
</script>

<template>
    <div class="max-w-4xl mx-auto p-6 space-y-6">
        <!-- プロフィールセクション -->
        <TheCard class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
            <div class="flex items-center space-x-4">
                <img :src="user.pictureURL" class="w-16 h-16 rounded-full ring-4 ring-white dark:ring-gray-600 shadow-lg" />
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.name }}</h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">プロフィール</p>
                </div>
            </div>
        </TheCard>

        <!-- 家計簿セクション -->
        <TheCard class="bg-white dark:bg-gray-800 shadow-xl rounded-lg">
            <TheForm label="家計簿">
                <!-- 共有ユーザーセクション -->
                <TheCard class="bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
                    <TheForm label="共有しているユーザー">
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <LinkUserItem name="山田太郎" role="メンバー" />
                            <LinkUserItem name="佐藤花子" role="メンバー" />
                        </ul>
                    </TheForm>
                </TheCard>

                <!-- 家計簿リスト -->
                <ul class="space-y-6">
                    <li v-for="householdBook in user.householdBooks" :key="householdBook.id" class="space-y-4">
                        <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <input type="text" v-model="householdBook.title"
                                class="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-none focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 px-3 py-2 rounded-lg" />
                            <div class="flex items-center space-x-3">
                                <PrimaryButton class="bg-indigo-600 hover:bg-indigo-700">
                                    更新
                                </PrimaryButton>
                                <PrimaryButton @click="handleShareHouseHoldLink(householdBook.id)" 
                                    class="bg-green-600 hover:bg-green-700">
                                    <ShareIcon class="w-5 h-5" />
                                </PrimaryButton>
                            </div>
                        </div>

                        <!-- カテゴリー予算セクション -->
                        <TheCard class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                            <div class="p-4">
                                <div class="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">カテゴリー別予算</h3>
                                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">各カテゴリーの月間予算上限を設定しています</p>
                                    </div>
                                    <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <CategoryLimits :categoryLimits="householdBook.categoryLimit" />
                                <div class="flex justify-end mt-4">
                                    <PrimaryButton @click="onClickOpenAddCategoryModal" 
                                        class="bg-indigo-600 hover:bg-indigo-700">
                                        「カテゴリ」を追加
                                    </PrimaryButton>
                                </div>
                            </div>
                        </TheCard>
                    </li>
                </ul>

                <!-- 家計簿追加ボタン -->
                <div class="flex justify-end mt-6">
                    <PrimaryButton @click="onClickOpenAddHouseholdModal" 
                        class="bg-indigo-600 hover:bg-indigo-700">
                        「家計簿」を追加
                    </PrimaryButton>
                </div>
            </TheForm>
        </TheCard>

        <!-- カテゴリ追加モーダル -->
        <BaseModal title="カテゴリ追加" :isOpen="isOpenModalAddCategory" @closeModal="onClickCloseAddItemModal"
            verticalPosition="top-20">
            <template #modalBody>
                <div class="space-y-4">
                    <TheForm label="カテゴリ名">
                        <input type="text" 
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" 
                            v-model="name" 
                            v-bind="nameProps" 
                            :class="{ 'bg-red-50 border-red-500 dark:bg-red-900/20': errors.name }"
                        />  
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.name }}</p>
                    </TheForm>
                    <TheForm label="上限値">
                        <input type="number" 
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" 
                            v-model="limitAmount" 
                            v-bind="limitAmountProps" 
                            :class="{ 'bg-red-50 border-red-500 dark:bg-red-900/20': errors.limitAmount }"
                        />  
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ errors.limitAmount }}</p>
                    </TheForm>
                </div>
            </template>
            <template #buttons>
                <div class="flex justify-end space-x-3">
                    <PrimaryButton @click="handleAddCategory" 
                        class="bg-indigo-600 hover:bg-indigo-700">
                        追加
                    </PrimaryButton>
                    <SecondaryButton @click="onClickCloseAddItemModal">
                        閉じる
                    </SecondaryButton>
                </div>
            </template>
        </BaseModal>
        
        <ModalAddHousehold :isOpenModal="isOpenModalAddHousehold" 
            @closeModal="onClickCloseAddHouseholdModal"
            @addHousehold="handleAddHousehold" />
    </div>
</template>