<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
const emit = defineEmits(['update:visible']);
import { DrawerProps, getSize, getPosition, getClass } from './index';
let width = ref(0);
let height = ref(0);
const props = defineProps(DrawerProps);
let visible = ref(props.visible);
const styleObj = computed(() => getSize(width.value, height.value));
const classObj = computed(() => getClass(props.position));
watch(
    () => props.visible,
    (val) => {
        visible.value = val;
        if (val) {
            const timer = setInterval(() => {
                if (!getPosition(props.position)) {
                    width.value += 5;
                    if (width.value === props.width) {
                        width.value = props.width;
                        clearInterval(timer);
                    }
                }
                if (getPosition(props.position)) {
                    height.value += 5;
                    if (height.value === props.height) {
                        height.value = props.height;
                        clearInterval(timer);
                    }
                }
            }, 10);
        }
    },
);
watch(
    () => visible.value,
    (val) => {
        emit('update:visible', val);
    },
);
const close = () => {
    const timer = setInterval(() => {
        if (!getPosition(props.position)) {
            width.value -= 5;
            if (width.value === 0) {
                width.value = 0;
                visible.value = false;
                clearInterval(timer);
            }
        }
        if (getPosition(props.position)) {
            height.value -= 5;
            if (height.value === 0) {
                height.value = 0;
                visible.value = false;
                clearInterval(timer);
            }
        }
    }, 10);
};
onMounted(() => {
    if (!getPosition(props.position)) {
        width.value = 0;
        height.value = 100;
    }
    if (getPosition(props.position)) {
        width.value = 100;
        height.value = 0;
    }
});
</script>
<template>
    <transition name="fade">
        <div v-if="visible" class="LewDrawer" @click="close">
            <div
                :style="styleObj"
                class="LewDrawerMain"
                :class="classObj"
                @click.stop
            >
                <slot></slot>
            </div>
        </div>
    </transition>
    <!-- </lew-modal> -->
</template>
<style lang="scss" scoped>
.LewDrawer {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: var(--lew-modal-bgcolor);
    backdrop-filter: blur(5px);
    outline: 1000000px solid var(--lew-modal-bgcolor);
    z-index: 9999;
}
.LewDrawerMain {
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    background: #fff;
    position: fixed;
}
.LewDrawerMain-right {
    right: 0;
    top: 0;
}
.LewDrawerMain-top {
    width: 100%;
    height: 20%;
    left: 0;
    top: 0;
}
.LewDrawerMain-left {
    left: 0;
    top: 0;
}
.LewDrawerMain-bottom {
    left: 0;
    bottom: 0;
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
