<script setup lang="ts">
</script>
<template>
    <div class="loading-overlay">
        <b-spinner label="Loading..." style="width: 3rem; height: 3rem;"></b-spinner>
    </div>
</template>
<style lang="scss" scoped>
.loading-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #6060609e;
    z-index: 1000;
    position: fixed;
}
</style>