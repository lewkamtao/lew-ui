<script lang="ts" setup>
import { computed, ref, onMounted, shallowRef } from 'vue';
import { backtopProps, useEventListener } from './props';
import { CaretUp } from '@vicons/ionicons5';
import { Icon } from '@vicons/utils';
const dom = shallowRef<HTMLElement>();
const showBackTop = ref(false);
const props = defineProps(backtopProps);
const emit = defineEmits(['click']);
const backTopStyle = computed(() => ({
    right: `${props.right}px`,
    bottom: `${props.bottom}px`,
}));
const toBackUp = () => {
    if (!dom.value) return;
    emit('click');
    let timer = setInterval(() => {
        let scrollDom: any = dom.value;
        let ispeed = Math.floor(-scrollDom.scrollTop / 5);
        scrollDom.scrollTop = scrollDom.scrollTop + ispeed;
        if (scrollDom.scrollTop === 0) {
            clearInterval(timer);
        }
    }, 20);
};
const handleScroll = () => {
    if (dom.value) showBackTop.value = dom.value.scrollTop >= props.valveHeight;
};
useEventListener(window, 'scroll', handleScroll);
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
        <div
            v-if="showBackTop"
            class="backTop"
            :style="backTopStyle"
            @click="toBackUp"
        >
            <slot>
                <Icon size="20">
                    <CaretUp />
                </Icon>
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
