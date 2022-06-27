<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    type: {
        type: String,
        default: 'normal',
    },
    round: {
        type: Boolean,
        default: false,
    },
    link: {
        type: String,
        default: '',
    },
    bold: {
        type: Number,
        default: 400,
    },
});
const toPath = () => {
    if (props.link) {
        if (props.link.startsWith('http')) {
            window.open(props.link);
        } else {
            router.push(props.link);
        }
    }
};
</script>

<template>
    <span
        class="lew-mark"
        :class="`lew-mark-${type} ${round ? 'lew-mark-round' : ''} ${
            link ? 'lew-mark-link' : ''
        }`"
        :style="`font-weight:${bold};`"
        @click="toPath"
    >
        <slot />
    </span>
</template>

<style lang="scss">
.lew-mark {
    display: inline;
    border-radius: 3px;
    padding: 2px 6px;
}

.lew-mark-link {
    cursor: pointer;
}

.lew-mark-primary {
    background-color: var(--lew-primary-color-light);
    color: var(--lew-primary-text-color);
}
.lew-mark-info {
    color: var(--lew-info-text-color);
    background-color: var(--lew-info-color-light);
}
.lew-mark-success {
    color: var(--lew-success-text-color);
    background-color: var(--lew-success-color-light);
}

.lew-mark-warning {
    color: var(--lew-warning-text-color);
    background-color: var(--lew-warning-color-light);
}
.lew-mark-error {
    color: var(--lew-error-text-color);
    background-color: var(--lew-error-color-light);
}
.lew-mark-normal {
    color: var(--lew-normal-text-color);
    background-color: var(--lew-normal-color-light);
}
</style>
