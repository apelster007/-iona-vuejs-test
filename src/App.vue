<script setup lang="ts">
import { RouterView } from 'vue-router'
import LoadingOverlay from '@/layout/LoadingOverlay.vue'
</script>

<template>
  <main class="p-4">
    <Suspense>
      <RouterView />
      <template #fallback>
        <loading-overlay />
      </template>
    </Suspense>
  </main>
</template>
