<script lang="ts" setup>
import { computed, ref, onMounted, shallowRef } from 'vue';
import throttle from 'lodash/throttle';
import { backtopProps } from './props';
import { useEventListener } from '../../../hooks';

const dom = shallowRef<HTMLElement>();
const showBackTop = ref(false);
const props = defineProps(backtopProps);

const emit = defineEmits(['click']);

const backTopStyle = computed(() => ({
    right: `${props.right}`,
    bottom: `${props.bottom}`,
}));

const toBackUp = () => {
    if (!dom.value) return;
    emit('click');
    let timer = setInterval(() => {
        let scrollDom = dom.value as HTMLElement;
        let ispeed = Math.floor(-scrollDom.scrollTop / 5);
        scrollDom.scrollTop = scrollDom.scrollTop + ispeed;
        if (scrollDom.scrollTop === 0) {
            clearInterval(timer);
        }
    }, 20);
};

const handleScroll = () => {
    if (dom.value)
        showBackTop.value =
            dom.value.scrollTop >= parseFloat(props.valveHeight);
};

const throttledScrollHandler = throttle(handleScroll, 250);

useEventListener(window, 'scroll', throttledScrollHandler);

onMounted(() => {
    dom.value = document.documentElement;
    if (props.target) {
        dom.value =
            document.querySelector<HTMLElement>(`.${props.target}`) ??
            undefined;
        if (!dom.value) {
            throw new Error(`target is not existed: ${props.target}`);
        }
    }
});
</script>

<template>
    <transition name="fade">
        <div v-if="showBackTop" class="backTop" :style="backTopStyle" @click="toBackUp">
            <slot>
                <lew-icon size="20" type="chevron-up" />
            </slot>
        </div>
    </transition>
</template>
<style lang="scss" scoped>
.backTop {
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--lew-bgcolor-0);
    box-shadow: var(--lew-box-shadow);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    color: var(--lew-primary-color);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
