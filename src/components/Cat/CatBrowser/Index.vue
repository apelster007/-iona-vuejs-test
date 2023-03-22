<script setup lang="ts">
import { ref, watch } from 'vue';
import useCatService from '@/services/cat.service';
import CatBreedSelect from './CatBreedSelect.vue';
import CatList from './CatList.vue';

interface searchParams {
    limit?: number;
    page?: number;
    breed_id?: string
}
const breedId = ref('');

const searchResults = ref([]);

const paginationParams = ref({ limit: 10, page: 0 })

const { search: catSearch } = useCatService();

const search = async (params: searchParams) => {
    const response = await catSearch({ params });
    if (response?.status === 200) {
        const data: [] = response?.data || [];
        searchResults.value.push(...data)
    }
}

watch(breedId, (newBreedId) => {
    const pagination = { limit: 10, page: 0 }
    paginationParams.value = pagination;
    search({ ...pagination, breed_id: newBreedId });
})

</script>
<template>
    <BContainer>
        <h1>Cat Browser</h1>
        <CatBreedSelect v-model="breedId" />
        <CatList :items="searchResults" />
    </BContainer>
</template>