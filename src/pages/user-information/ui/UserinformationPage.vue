<script setup lang="ts">
  import { InformationItem } from '@/features/user-information'
  import { useInteraction } from '../hooks/useInteraction'

  const { informations } = useInteraction()
</script>

<template>
  <div
    v-for="information in informations"
    :key="information.id"
    class="m-2"
  >
    <InformationItem :information="information" />
  </div>
</template>
