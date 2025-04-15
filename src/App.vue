<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultLayout, AuthLayout } from '@/shared/ui/layouts'

const route = useRoute()
const layout = computed(() => route.meta.layout || 'default')
</script>

<template>
  <DefaultLayout v-if="layout === 'default'" :title="route.meta.title as string">
    <router-view></router-view>
  </DefaultLayout>

  <AuthLayout v-else-if="layout === 'auth'" :title="route.meta.title as string">
    <router-view></router-view>
  </AuthLayout>
  <router-view v-else></router-view>
</template>
