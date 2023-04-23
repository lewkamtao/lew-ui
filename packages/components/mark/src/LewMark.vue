<script lang="ts" setup>
import { useLewTo } from '../../../hooks';
import { getClass } from 'lew-ui/utils';
import { markProps } from './mark';

const props = defineProps(markProps);
const { lewTo } = useLewTo();

const getMarkClassName = computed(() => {
    const { type, round } = props;
    const to = !!props.to;
    return getClass('lew-mark', { type, round, to });
});
</script>

<template>
    <span
        class="lew-mark"
        :class="getMarkClassName"
        :style="`font-weight:${bold};`"
        @click="lewTo(to)"
    >
        <slot />
    </span>
</template>

<style lang="scss">
.lew-mark {
    display: inline;
    border-radius: 2px;
    padding: 2px 6px;
    margin: 0px 4px;
}

.lew-mark-to {
    cursor: pointer;
}
.lew-mark-round {
    border-radius: 20px;
}
.lew-mark-bold {
    border-radius: 800;
}

.lew-mark-type-primary {
    color: var(--lew-primary-color-dark);
    background-color: var(--lew-primary-color-light);
}
.lew-mark-type-info {
    color: var(--lew-info-color-dark);
    background-color: var(--lew-info-color-light);
}
.lew-mark-type-success {
    color: var(--lew-success-color-dark);
    background-color: var(--lew-success-color-light);
}

.lew-mark-type-warning {
    color: var(--lew-warning-color-dark);
    background-color: var(--lew-warning-color-light);
}
.lew-mark-type-error {
    color: var(--lew-error-color-dark);
    background-color: var(--lew-error-color-light);
}
.lew-mark-type-normal {
    color: var(--lew-text-color-2);
    background-color: var(--lew-normal-color-light);
}
</style>
