<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import useCatService from '@/services/cat.service';
import CatBreedSelect from './CatBreedSelect.vue';
import CatList from './CatList.vue';
import { useRoute, useRouter } from 'vue-router';
import type { CatImage } from '@/types/cat.types';

interface searchParams {
    limit?: number;
    page?: number;
    breed_id?: string
}

const { query } = useRoute();

const initalBreedId: string = String(query?.breed) || '';

const breedId = ref(initalBreedId);

const searchResults = ref<CatImage[]>([]);

const items = computed<CatImage[]>(() => {
    return searchResults.value.reduce((accumulator: CatImage[], current) => {
        if (!accumulator.some((x) => x.id === current.id)) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
})

const limit = ref(10);

const page = ref(0)

const isLoadMoreable = ref(true);

const isLoadingMore = ref(false);

const { search: catSearch } = useCatService();

const isSearching = ref(false);

const router = useRouter();

const reset = () => {
    page.value = 0;
    isLoadingMore.value = false;
    searchResults.value = [];
    isLoadMoreable.value = true;
}

const search = async (params: searchParams) => {
    const response = await catSearch({ params: { ...params, order: 'ASC' } });
    if (response?.status === 200) {
        const data: CatImage[] = response?.data || [];
        const filtered = data.filter(d => searchResults.value.findIndex(s => s.id === d.id) === -1);
        if (!filtered.length) {
            isLoadMoreable.value = false;
            return;
        }
        searchResults.value.push(...filtered)

    }
}

watch(breedId, async (newBreedId) => {
    if (newBreedId) {
        isSearching.value = true;
        reset();
        router.push({ name: 'home', query: { breed: newBreedId } })
        const pagination = { limit: limit.value, page: 0 }
        await search({ ...pagination, breed_id: newBreedId });
        isSearching.value = false;
    } else {
        reset();
    }
}, {
    immediate: true
})

const loadMore = async () => {
    if (isLoadingMore.value) return;
    isLoadingMore.value = true;
    const nextPage = page.value + 1;
    const pagination = { limit: limit.value, page: nextPage }
    try {
        await search({ ...pagination, breed_id: breedId.value });
        isLoadingMore.value = false;
    } catch (err) {
        isLoadingMore.value = false;
    }
}

</script>
<template>
    <BContainer>
        <h1>Cat Browser</h1>
        <CatBreedSelect v-model="breedId" class="mb-4" />
        <template v-if="isSearching">
            <div class="text-center">
                <b-spinner label="Loading..."></b-spinner>
                <h6>Loading...</h6>
            </div>
        </template>
        <template v-if="searchResults.length">
            <CatList :items="items" />
            <b-button :loading="isLoadingMore" v-if="isLoadMoreable && searchResults.length" block variant="success"
                class="w-100" @click="loadMore" lab>
                <span v-if="!isLoadingMore">Load more</span>
            </b-button>
        </template>

    </BContainer>
</template>