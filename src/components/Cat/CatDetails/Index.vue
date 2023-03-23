<script setup lang="ts">
import useCatService from '@/services/cat.service';
import { computed, ref } from 'vue';
import type { CatImage, Breed } from '@/types/cat.types';
import router from '@/router';

export interface CatDetailsProps {
    id: string;
}

export interface CatDetails extends CatImage {
    breeds: Breed[]
}

const props = defineProps<CatDetailsProps>();

const detail = ref<CatDetails | null>(null);

const isLoading = ref(false);

const breedInfo = computed<Breed | null>(() => {
    if (detail.value && detail.value.breeds && detail.value.breeds.length) {
        return detail.value.breeds[0];
    }
    return null;
});

const { getDetails } = useCatService()

const getCatDetails = async (id: string) => {
    isLoading.value = true;
    try {
        const response = await getDetails(id);
        if (response?.status === 200 && response?.data) {
            detail.value = response.data;
            isLoading.value = false;
        }
    } catch (err) {
        console.log(err);

    }

}
const init = () => {
    getCatDetails(props.id)
}

const back = () => {
    router.back()
}

init();
</script>
<template>
    <BContainer>
        <b-card header="Default">
            <template #header>
                <div class="d-flex align-items-center justify-content-start">
                    <b-button href="#" variant="primary" @click="back">Back</b-button>
                </div>
            </template>
            <b-card-text>
                <template v-if="isLoading">
                <div class="text-center">
                    <b-spinner label="Loading..."></b-spinner>
                    <h6>Loading...</h6>
                </div>
                </template>
                <template v-if="detail">
                    <b-img fluid :src="detail.url" :width="detail.width" :alt="detail.id" :height="detail.height"
                        class="mb-3" />
                    <b-card-body v-if="breedInfo">
                        <h4>{{ breedInfo.name }}r</h4>
                        <h5>Origin: {{ breedInfo.origin }}</h5>
                        <h6>{{ breedInfo.temperament }}</h6>
                        <p>{{ breedInfo.description }}</p>
                    </b-card-body>
                </template>
            </b-card-text>
        </b-card>

    </BContainer>
</template>