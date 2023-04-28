<script setup lang="ts">
import { useImage } from '@vueuse/core';
import { object2class } from 'lew-ui/utils';
import { avatarProps } from './avatar';

const props = defineProps(avatarProps);
const { isLoading } = useImage({ src: props.src });
const isError = ref(false);

const imgSrc = computed(() => {
    return isError.value ? props.errorSrc : props.src;
});

const dotClassName = computed(() => {
    return object2class('dot', {
        status: props.status,
        statusPosition: props.statusPosition,
    });
});

const avatarClassName = computed(() => {
    return object2class('lew-avatar', {
        round: props.round,
        skeletons: isLoading.value,
    });
});

const avatarStyleObject = computed(() => {
    return {
        width: `${props.width}px`,
        height: `${props.height}px`,
    };
});
</script>

<template>
    <div class="lew-avatar" :style="avatarStyleObject">
        <div class="lew-avatar-box" :class="avatarClassName">
            <span v-if="isLoading" class="skeletons"> </span>
            <img
                :src="imgSrc"
                :alt="alt"
                :onerror="() => (isError = true)"
                lazy
            />
        </div>
        <span v-if="status" class="dot" :class="dotClassName"> </span>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    position: relative;
    display: inline-block;

    .lew-avatar-box {
        width: 100%;
        height: 100%;
        border-radius: var(--lew-border-radius);
        overflow: hidden;
        background-color: #eee;
    }

    img {
        width: 100%;
        height: 100%;
        background-color: var(--lew-bgcolor-2);
        border-radius: var(--lew-border-radius);
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

    .dot-status-online {
        background-color: var(--lew-success-color);
    }

    .dot-status-busy {
        background-color: var(--lew-error-color);
    }

    .dot-status-offline {
        background-color: var(--lew-normal-color-dark);
    }

    .dot-status-processing {
        background-color: var(--lew-info-color);
    }

    .dot-status-away {
        background-color: var(--lew-warning-color);
    }

    .dot-statusPosition-top-left {
        top: -0.25rem;
        left: -0.25rem;
    }

    .dot-statusPosition-top-right {
        top: -0.25rem;
        left: auto;
        right: -0.25rem;
    }

    .dot-statusPosition-bottom-left {
        top: auto;
        bottom: -0.25rem;
        left: -0.25rem;
    }

    .dot-statusPosition-bottom-right {
        top: auto;
        bottom: -0.25rem;
        left: auto;
        right: -0.25rem;
    }
}
.lew-avatar-round.lew-avatar-box {
    border-radius: 50%;
}
</style>
