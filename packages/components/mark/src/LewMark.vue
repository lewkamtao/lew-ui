<script lang="ts" setup>
import { useLewTo } from '../../../hooks';
import { object2class } from 'lew-ui/utils';
import { markProps } from './mark';

const props = defineProps(markProps);
const { lewTo } = useLewTo();

const getMarkClassName = computed(() => {
    const { round } = props;
    const to = !!props.to;
    return object2class('lew-mark', { round, to });
});
const getStyle = computed(() => {
    const { color, round, bold } = props;
    let styleObj = {} as any;
    const _map: any = {
        normal: 'gray',
        warning: 'orange',
        success: 'green',
        error: 'red',
        info: 'blue',
    };
    let _color = _map[color] || color;
    styleObj.borderRadius = round ? '20px' : '4px';
    styleObj.fontWeight = bold ? bold : '';
    styleObj.color = `var(--lew-color-${_color}-dark)`;
    styleObj.backgroundColor = `var(--lew-color-${_color}-light)`;
    return styleObj;
});
</script>

<template>
    <span
        class="lew-mark"
        :class="getMarkClassName"
        :style="getStyle"
        @click="lewTo(to)"
    >
        <slot />
    </span>
</template>

<style lang="scss">
.lew-mark {
    display: inline;
    border-radius: 4px;
    padding: 2px 6px;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
}

.lew-mark-to {
    cursor: pointer;
}
.lew-mark-round {
    border-radius: 20px;
}
</style>
