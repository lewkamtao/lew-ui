<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { useDOMCreate } from '../../../hooks';
import { DrawerProps, getClass, getStyle } from './index';

useDOMCreate('lew-drawer');
const emit = defineEmits(['update:visible']);

const props = defineProps(DrawerProps);
let _visible = ref(props.visible);
let isShowMain = ref(false);

watch(
    () => props.visible,
    (val) => {
        _visible.value = val;
        setTimeout(() => {
            // 设置固定单元格的阴影
            isShowMain.value = val;
        }, 200);
    },
);

const close = () => {
    isShowMain.value = false;
    setTimeout(() => {
        emit('update:visible', false);
    }, 200);
};
</script>
<template>
    <teleport to="#lew-drawer">
        <transition name="fade">
            <div
                v-if="_visible"
                class="lew-drawer"
                :class="{ 'lew-drawer-show': isShowMain }"
                @click="close"
            >
                <div
                    :style="getStyle(position, width, height)"
                    class="lew-drawer-main"
                    :class="getClass(position)"
                    @click.stop
                >
                    <slot></slot>
                </div>
            </div> </transition
    ></teleport>
</template>
<style lang="scss">
.lew-drawer {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: var(--lew-modal-bgcolor);
    backdrop-filter: blur(5px);
    outline: 1000000px solid var(--lew-modal-bgcolor);
    z-index: 999;
}
.lew-drawer-main {
    position: fixed;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    background: #fff;
    z-index: 9999;
}
.lew-drawer-main-right {
    right: 0;
    top: 0;
    transform: translateX(100%);
}
.lew-drawer-main-top {
    width: 100%;
    height: 20%;
    left: 0;
    top: 0;
    transform: translateY(-100%);
}
.lew-drawer-main-left {
    left: 0;
    top: 0;
    transform: translateX(-100%);
}
.lew-drawer-main-bottom {
    left: 0;
    bottom: 0;
    transform: translateY(100%);
}
.lew-drawer-show {
    .lew-drawer-main {
        transform: translate(0, 0);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
