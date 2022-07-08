<script setup lang="ts">
import TheHeader from './layout/TheHeader.vue';
</script>

<template>
    <div class="wrapper">
        <the-header />
        <router-view />
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    max-width: 1380px;
    height: 100%; 
    margin: 0 auto;
    background: var(--lew-bgcolor-0);
    border-left: var(--lew-border-2);
    border-right: var(--lew-border-2);
}

@media (max-width: 767px) {
    .wrapper {
        width: 100vw;
    }
}
</style>
