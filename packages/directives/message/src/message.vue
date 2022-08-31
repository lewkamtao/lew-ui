<script setup lang="ts">
import { VNode, ref, onMounted, computed, defineComponent } from 'vue';
import { MessageType } from './types';
import { getInstance } from './index';
import { isString } from 'lodash';
import { useResizeObserver } from '@vueuse/core';

defineComponent({
    name: 'LewMessage',
});

interface MessageProps {
    id: string;
    appendTo: string;
    type: MessageType;
    message: string | VNode;
    duration: number;
    icon: string | VNode;
    top: number;
    onClose: () => void;
    onDestory: () => void;
}
const props = defineProps<MessageProps>();

const visible = ref(false);

onMounted(() => {
    startTimer();
    visible.value = true;
});

const startTimer = () => {
    if (props.duration === 0) return;
    setTimeout(() => {
        props.onClose();
    }, props.duration);
};

const messageRef = ref<HTMLElement>();

useResizeObserver(messageRef, (entries: ResizeObserverEntry[]) => {
    rectHeight.value = entries[0].contentRect.height;
});

const lastHeight = computed(() => {
    const { prev } = getInstance(props.id);
    if (!prev) {
        return 0;
    }
    return prev.vm.exposed!.height.value;
});

const rectHeight = ref(0);

const height = computed(() => {
    return rectHeight.value + lastHeight.value;
});

const iconComponent = computed(() => (isString(props.icon) ? false : true));

defineExpose({
    visible,
    height,
});
</script>

<template>
    <Teleport :to="props.appendTo">
        <Transition name="fade">
            <div
                v-if="visible"
                id="lew-message"
                ref="messageRef"
                :style="{ top: height + 'px' }"
                :class="[props.id]"
            >
                <div
                    :class="[
                        'message',
                        `message-${props.type}`,
                        visible ? 'message-show' : 'message-hidden',
                    ]"
                >
                    <template v-if="iconComponent">
                        <component :is="props.icon" />
                    </template>
                    <template v-else>
                        <i class="message-icon" v-html="props.icon"></i>
                    </template>
                    <slot v-if="$slots.default()"></slot>
                    <div v-else class="content">{{ props.message }}</div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
