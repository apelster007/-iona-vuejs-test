<script setup lang="ts">
import type { CatImage } from '@/types/cat.types';
import CatItem from './CatItem.vue';

export interface CatListProps {
    items: CatImage[];
}
const props = defineProps<CatListProps>()


</script>
<template>
    <b-row class="bd-example-row">
        <b-col cols="3" v-for="image in items" :key="image.id" class="mb-4">
            <CatItem :item="image" />
        </b-col>
    </b-row>
</template>