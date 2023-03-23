<script setup lang="ts">
import CatDetails from '@/components/Cat/CatDetails/Index.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();
const catId = computed(() => String(params?.id));

</script>

<template>
    <CatDetails :id="catId"/>
</template>
