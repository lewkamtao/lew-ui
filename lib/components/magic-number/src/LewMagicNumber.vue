<script setup lang="ts">
import { magicNumberProps } from './props';
import { numFormat } from 'lew-ui/utils';

const props = defineProps(magicNumberProps);

let state = reactive({
    numberArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
});

const getValueArr = computed(() => {
    if (typeof props.value !== 'number') {
        throw new Error('LewMagicNumber props value 必须为number类型！');
    }

    if (props.sep) {
        return numFormat(props.value).split('');
    } else {
        return String(props.value).split('');
    }
});

const getMagicNumberStyle = computed(() => {
    const { size } = props;
    return `height:${size}px;`;
});
const getItemStyle = computed(() => (item: string) => {
    const { size } = props;
    let index = parseInt(item);
    return `transform: translateY(-${size * index}px)`;
});
const getNumStyle = computed(() => {
    const { size } = props;
    return `font-size:${size}px; line-height:${size}px; height:${size}px;`;
});
</script>

<template>
    <div class="lew-magic-number" :style="getMagicNumberStyle">
        <div
            :style="getItemStyle(item)"
            class="lew-magic-number-item"
            v-for="(item, index) in getValueArr"
            :key="index"
        >
            <span :style="getNumStyle" v-if="item === '.' || item === ','"
                >{{ item }}
            </span>
            <span
                v-else
                class="lew-magic-number-num"
                :style="getNumStyle"
                v-for="(n, index) in state.numberArr"
                :key="index"
                v-text="n"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-magic-number {
    display: inline-flex;
    overflow: hidden;
    .lew-magic-number-item {
        display: inline-flex;
        flex-direction: column;
        transition: transform 0.45s;
        .lew-magic-number-num {
            overflow: hidden;
            flex-shrink: 0;
            text-align: center;
        }
    }
}
</style>
