<script setup lang="ts">
import { _props } from './props';

const props = defineProps(_props);

const getAvatarStyle = computed(() => {
    return `width:${props.width};height:${props.height}`;
});

const getAvatarClass = computed(() => {
    return `${props.round ? 'lew-avatar-round' : ''}`;
});

const getAvatarDotClass = computed(() => {
    return `dot-${props.status} dot-${props.statusPosition}`;
});

</script>
 
<template>
    <div class="lew-avatar" :style="getAvatarStyle">
        <img :src="src" :alt="alt" :class="getAvatarClass" />
        <span v-if="status" class="dot" :class="getAvatarDotClass">
        </span>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    position: relative;
    display: inline-block;

    img {
        width: 100%;
        height: 100%;
        background-color: var(--lew-bgcolor-2);
        border-radius: var(--lew-border-radius);
    }

    .lew-avatar-round {
        border-radius: 50%;
    }

    .dot {
        position: absolute;
        top: -0.3rem;
        left: -0.3rem;
        content: '';
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        z-index: 99;
        border: 2px var(--lew-white-color) solid;
    }

    .dot-online {
        background-color: var(--lew-success-color);
    }

    .dot-busy {
        background-color: var(--lew-error-color);
    }

    .dot-offline {
        background-color: var(--lew-normal-color-dark);
    }

    .dot-processing {
        background-color: var(--lew-info-color);
    }

    .dot-away {
        background-color: var(--lew-warning-color);
    }

    .dot-top-left {
        top: -0.25rem;
        left: -0.25rem;
    }

    .dot-top-right {
        top: -0.25rem;
        left: auto;
        right: -0.25rem;
    }

    .dot-bottom-left {
        top: auto;
        bottom: -0.25rem;
        left: -0.25rem;
    }

    .dot-bottom-right {
        top: auto;
        bottom: -0.25rem;
        left: auto;
        right: -0.25rem;
    }
}
</style>
