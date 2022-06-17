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
        type: Boolean,
        default: false,
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
        } ${bold ? 'lew-badge-bold' : ''} ${
            href ? 'lew-badge-href' : ''
        } lew-badge-${type} `"
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
    color: var(--primary-text-color);
    background-color: var(--primary-color-light);
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
    background-color: var(--primary-color-hover);
}

.lew-badge-dot.lew-badge-success {
    background-color: var(--success-color-hover);
}

.lew-badge-dot.lew-badge-warning {
    background-color: var(--warning-color-hover);
}

.lew-badge-dot.lew-badge-danger {
    background-color: var(--danger-color-hover);
}

.lew-badge-dot.lew-badge-normal {
    background-color: var(--normal-color-hover);
}

.lew-badge-primary {
    color: var(--primary-text-color);
    background-color: var(--primary-color-light);
}
.lew-badge-success {
    color: var(--success-text-color);
    background-color: var(--success-color-light);
}

.lew-badge-warning {
    color: var(--warning-text-color);
    background-color: var(--warning-color-light);
}
.lew-badge-danger {
    color: var(--danger-text-color);
    background-color: var(--danger-color-light);
}
.lew-badge-normal {
    color: var(--normal-text-color);
    background-color: var(--normal-color-light);
}
</style>
