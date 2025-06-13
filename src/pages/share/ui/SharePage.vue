<script setup lang="ts">
  import { PrimaryButton, TheForm, TheCard } from '@/shared/ui'
  import { useInteraction } from '../hooks/useInteraction'

  const { onClickAcceptInvite, household, inviteUser } = useInteraction()
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4"
  >
    <div class="max-w-2xl w-full mx-auto">
      <TheCard
        class="shadow-2xl transform transition-all duration-500 hover:scale-[1.02] backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50"
      >
        <div class="text-center space-y-10 p-8">
          <div class="relative">
            <h1
              class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 dark:from-indigo-400 dark:via-pink-400 dark:to-purple-400 animate-pulse"
            >
              招待のお知らせ
            </h1>
            <div
              class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 rounded-full animate-pulse"
            ></div>
          </div>

          <div class="space-y-4">
            <p class="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {{ inviteUser?.name }}さんから招待が来ています
            </p>
            <div class="space-y-2">
              <p
                class="text-xl text-gray-600 dark:text-gray-400 italic font-light"
              >
                家計簿に参加して、
              </p>
              <p
                class="text-xl text-gray-600 dark:text-gray-400 italic font-light"
              >
                支出を可視化しましょう！
              </p>
            </div>
          </div>

          <TheForm
            label="家計簿"
            class="mt-8"
          >
            <div
              class="p-8 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-inner"
            >
              <div class="space-y-6">
                <div
                  class="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors duration-300"
                >
                  <span class="text-indigo-600 dark:text-indigo-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </span>
                  <p class="text-xl font-medium text-gray-900 dark:text-white">
                    ID: {{ household?.id }}
                  </p>
                </div>
                <div
                  class="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors duration-300"
                >
                  <span class="text-indigo-600 dark:text-indigo-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </span>
                  <div class="space-y-1">
                    <p
                      class="text-xl font-medium text-gray-900 dark:text-white"
                    >
                      家計簿名:
                      {{ household?.title }}
                    </p>
                    <p class="text-lg text-gray-600 dark:text-gray-400">
                      家計簿説明:
                      {{ household?.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TheForm>

          <div class="mt-10">
            <PrimaryButton
              class="w-full py-5 text-xl font-bold bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 hover:from-indigo-700 hover:via-pink-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              @click="onClickAcceptInvite"
            >
              招待を承認する
            </PrimaryButton>
          </div>
        </div>
      </TheCard>
    </div>
  </div>
</template>
