<script setup lang="ts">
import type { CatImage } from '@/types/cat.types';
import { useRouter } from 'vue-router';

export interface CatListProps {
    item: CatImage;
}

const props = defineProps<CatListProps>()
const router = useRouter();

const goToDetails = (id: string) => {
    router.push({ name: 'single_cat', params: { id } })
}
</script>
<template>
    <b-card>
        <b-img :height="item.height" :src="item.url" :width="item.width" fluid :alt="item.id" class="mb-3" />
        <b-button block variant="primary" class="w-100" @click="() => goToDetails(item.id)">View Details</b-button>
    </b-card>
</template>