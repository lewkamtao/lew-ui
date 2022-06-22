<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    type: {
        type: String,
        default: 'primary',
    },
    round: {
        type: Boolean,
        default: false,
    },
    bold: {
        type: Number,
        default: 400,
    },
    dot: {
        type: Boolean,
        default: false,
    },
    href: {
        type: String,
        default: '',
    },
});
const toLink = () => {
    if (props.href) {
        if (props.href.includes('http')) {
            window.open(props.href, '_blank');
        } else {
            router.push(props.href);
        }
    }
};
</script>

<template>
    <span
        class="lew-badge"
        :class="`${dot ? 'lew-badge-dot' : ''} ${
            round ? 'lew-badge-round' : ''
        } ${href ? 'lew-badge-href' : ''} lew-badge-${type} `"
        :style="` font-weight:${bold}`"
        @click="toLink()"
    >
        <slot></slot>
    </span>
</template>

<style lang="scss">
.lew-badge {
    min-width: 14px;
    border-radius: 0.25rem;
    padding: 2px 8px 3px 8px;
    font-size: 0.75rem;
    margin-right: 10px;
    cursor: default;
    color: var(--lew-primary-text-color);
    background-color: var(--lew-primary-color-light);
    font-weight: normal;
}
.lew-badge-bold {
    font-weight: 600;
}

.lew-badge-round {
    border-radius: 30px;
}

.lew-badge-href {
    cursor: pointer;
}

.lew-badge-dot {
    display: inline-block;
    max-width: 4px;
    max-height: 4px;
    min-width: 4px;
    min-height: 4px;
    width: 4px;
    height: 4px;
    padding: 2px;
}

.lew-badge-dot.lew-badge-primary {
    background-color: var(--lew-primary-color-hover);
}

.lew-badge-dot.lew-badge-success {
    background-color: var(--lew-success-color-hover);
}

.lew-badge-dot.lew-badge-warning {
    background-color: var(--lew-warning-color-hover);
}

.lew-badge-dot.lew-badge-danger {
    background-color: var(--lew-danger-color-hover);
}

.lew-badge-dot.lew-badge-normal {
    background-color: var(--lew-normal-color-hover);
}

.lew-badge-primary {
    color: var(--lew-primary-text-color);
    background-color: var(--lew-primary-color-light);
}
.lew-badge-success {
    color: var(--lew-success-text-color);
    background-color: var(--lew-success-color-light);
}

.lew-badge-warning {
    color: var(--lew-warning-text-color);
    background-color: var(--lew-warning-color-light);
}
.lew-badge-danger {
    color: var(--lew-danger-text-color);
    background-color: var(--lew-danger-color-light);
}
.lew-badge-normal {
    color: var(--lew-normal-text-color);
    background-color: var(--lew-normal-color-light);
}
</style>
