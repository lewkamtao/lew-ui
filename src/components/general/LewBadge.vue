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
        :class="`${round ? 'lew-badge-round' : ''} ${
            href ? 'lew-badge-href' : ''
        } lew-badge-${type}`"
        @click="toLink()"
    >
        <slot></slot>
    </span>
</template>

<style lang="scss" scoped>
.lew-badge {
    border-radius: 0.25rem;
    padding: 2px 8px 3px 8px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-right: 10px;
    cursor: default;
    color: var(--primary-text-color);
    background-color: var(--primary-color-light);
}

.lew-badge-round {
    border-radius: 10px;
}

.lew-badge-href {
    cursor: pointer;
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
.lew-badge-gray {
    color: var(--gray-text-color);
    background-color: var(--gray-color-light);
}
</style>
