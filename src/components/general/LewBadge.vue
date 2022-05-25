<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    color: {
        type: String,
        default: 'blue',
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
        class="badge"
        :class="`${round ? 'badge-round' : ''} ${
            href ? 'badge-href' : ''
        } badge-${color}`"
        @click="toLink()"
    >
        <slot></slot>
    </span>
</template>

<style lang="scss" scoped>
.badge {
    border-radius: 0.25rem;
    padding: 2px 8px 3px 8px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-right: 10px;
    cursor: default;
    color: var(--badge-blue-text-color);
    background-color: var(--badge-blue-bgcolor);
}
.badge-round {
    border-radius: 10px;
}
.badge-href {
    cursor: pointer;
}

.badge-blue {
    color: var(--badge-blue-text-color);
    background-color: var(--badge-blue-bgcolor);
}
.badge-gray {
    color: var(--badge-gray-text-color);
    background-color: var(--badge-gray-bgcolor);
}
.badge-red {
    color: var(--badge-red-text-color);
    background-color: var(--badge-red-bgcolor);
}
.badge-green {
    color: var(--badge-green-text-color);
    background-color: var(--badge-green-bgcolor);
}
.badge-yellow {
    color: var(--badge-yellow-text-color);
    background-color: var(--badge-yellow-bgcolor);
}
.badge-purple {
    color: var(--badge-purple-text-color);
    background-color: var(--badge-purple-bgcolor);
}
.badge-indigo {
    color: var(--badge-indigo-text-color);
    background-color: var(--badge-indigo-bgcolor);
}
.badge-pink {
    color: var(--badge-pink-text-color);
    background-color: var(--badge-pink-bgcolor);
}
</style>
