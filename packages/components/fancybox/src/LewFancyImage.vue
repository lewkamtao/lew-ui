<script setup lang="ts">
defineProps({
    round: {
        type: Boolean,
        default: false,
    },
    src: {
        type: String,
        default: '',
    },
    alt: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <a class="lew-fancy-img" data-fancybox="gallery" :href="src">
        <img :round="round" :src="src" />
    </a>
</template>

<style lang="scss" scoped>
.lew-fancy-img {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--lew-form-border-radius);
    }

    .round {
        border-radius: 50%;
    }
}
</style>
