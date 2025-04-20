<script setup lang="ts">
import { useSessionStore } from '@/entities/session/model/session-store'
import { computed, ref } from 'vue';
import { TheForm, TheCard, PrimaryButton } from '@/shared/ui';
import ModalAddCategory from './ModalAddCategory.vue';
import ModalAddHousehold from './ModalAddHousehold.vue';
import LinkUserItem from './LinkUserItems.vue';
import CategoryLimits from './CategoryLimits.vue';

const sessionStore = useSessionStore()

const user = computed(() => sessionStore.user)

const isOpenModalAddCategory = ref(false)
const isOpenModalAddHousehold = ref(false)

const onClickOpenAddCategoryModal = () => {
    isOpenModalAddCategory.value = true
}

const onClickCloseAddItemModal = () => {
    isOpenModalAddCategory.value = false
}

const onClickOpenAddHouseholdModal = () => {
    isOpenModalAddHousehold.value = true
}

const onClickCloseAddHouseholdModal = () => {
    isOpenModalAddHousehold.value = false
}

const handleAddCategory = () => {
    console.log('handleAddCategory')
    isOpenModalAddCategory.value = false
}

const handleAddHousehold = () => {
    console.log('handleAddHousehold')
    isOpenModalAddHousehold.value = false
}


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
    <ModalAddCategory :isOpenModal="isOpenModalAddCategory" @closeModal="onClickCloseAddItemModal"
        @addCategory="handleAddCategory" />
    <ModalAddHousehold :isOpenModal="isOpenModalAddHousehold" @closeModal="onClickCloseAddHouseholdModal"
        @addHousehold="handleAddHousehold" />
</template>