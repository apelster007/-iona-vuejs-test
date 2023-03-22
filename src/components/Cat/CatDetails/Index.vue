<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();
const catId = computed(() => params?.id)

</script>
<template>
    <BContainer>
            {{ catId }}
    </BContainer>
</template>