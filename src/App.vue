<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { DefaultLayout, AuthLayout, AdminLayout } from '@/shared/ui/layouts'

  const route = useRoute()
  const layout = computed(() => route.meta.layout || 'default')
</script>

<template>
  <DefaultLayout
    v-if="layout === 'default'"
    :title="route.meta.title as string"
  >
    <router-view></router-view>
  </DefaultLayout>

  <AuthLayout
    v-else-if="layout === 'auth'"
    :title="route.meta.title as string"
  >
    <router-view></router-view>
  </AuthLayout>

  <AdminLayout
    v-else-if="layout === 'admin'"
    :title="route.meta.title as string"
  >
    <router-view></router-view>
  </AdminLayout>

  <router-view v-else></router-view>
</template>
