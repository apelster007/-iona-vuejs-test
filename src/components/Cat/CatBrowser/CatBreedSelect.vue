<script setup lang="ts">
import { computed, ref } from 'vue';
import useCatService from '@/services/cat.service.js';

const props = defineProps({
    modelValue: String
})

const breeds = ref<[]>([])
const options = computed(() => {
    return [
        {value: '', text: 'Select breed'},
        ...breeds.value.map((r: { id: string, name: string }) => ({ value: r.id, text: r.name }))
    ]
})

const { getBreeds } = useCatService();

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
    emit('update:modelValue', value)
}

const init = async () => {
    try {
        const response = await getBreeds();
        if (response?.status === 200) {
            breeds.value = response.data
        }
        console.log(options.value)
    } catch (err) {
        console.log(err);
    }
}
init();

</script>
<template>
    <div>
        <label class="mb-2">Breed</label>
        <b-form-select :disabled="!breeds.length" :model-value="props.modelValue" :options="options" @input="updateValue"
            :text-field="'text'"></b-form-select>
    </div>
</template>