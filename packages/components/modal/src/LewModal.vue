<script lang="ts" setup name="Modal">
import { useDOMCreate } from '../../../hooks';
import { useVModels } from '@vueuse/core';

useDOMCreate('lew-modal');

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '',
    },
    visible: {
        type: Boolean,
        default: false,
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['confirm']);

const { visible } = useVModels(props, emit);

let _visible = ref(props.visible);
let _visibleTimer = ref();

watch(
    () => props.visible,
    (v) => {
        if (!v) {
            clearTimeout(_visibleTimer.value);
            _visibleTimer.value = setTimeout(() => {
                _visible.value = v;
                visible.value = v;
            }, 250);
        } else {
            _visible.value = v;
            visible.value = v;
        }
    }
);

const maskClick = () => {
    if (props.closeOnClickOverlay) {
        visible.value = false;
    }
};
</script>

<template>
    <teleport to="#lew-modal">
        <div
            v-if="_visible"
            class="lew-modal"
            :style="
                visible
                    ? 'animation: lewModalOpen 0.25s;'
                    : 'animation: lewModalClose 0.25s;'
            "
            @click="maskClick"
        >
            <div
                class="lew-modal-box"
                :style="`width:${width};height:${height};${
                    visible
                        ? 'animation: lewModalBoxOpen 0.25s;'
                        : 'animation: lewModalBoxClose 0.25s;'
                }`"
                @click.stop
            >
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
.lew-modal {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: var(--lew-modal-bgcolor);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2001;
    animation-fill-mode: forwards;

    .lew-modal-box {
        border-radius: var(--lew-border-radius);
        background-color: var(--lew-bgcolor-0);
        box-shadow: 0px 15px 50px rgba($color: #000000, $alpha: 0.05);
        animation-fill-mode: forwards;
    }
}

.lew-modal-enter-active,
.lew-modal-leave-active {
    transition: all 0.25s;
}

.lew-modal-enter-from,
.lew-modal-leave-to {
    opacity: 0;
}

.lew-modal-box-enter-active,
.lew-modal-box-leave-active {
    transition: all 0.25s;
}

.lew-modal-box-enter-from,
.lew-modal-box-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>

<style>
@keyframes lewModalOpen {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes lewModalClose {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes lewModalBoxOpen {
    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes lewModalBoxClose {
    from {
        opacity: 1;
        transform: translateY(0px);
    }

    to {
        opacity: 0;
        transform: translateY(15px);
    }
}
</style>
