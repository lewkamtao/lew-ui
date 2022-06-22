<template>
    <teleport to="#lew-modal">
        <transition name="lew-modal">
            <div v-if="visible" class="lew-modal" @click="maskClick">
                <div
                    v-if="visible"
                    class="lew-modal-box"
                    :style="`width:${width};height:${height}`"
                    @click.stop
                >
                    <slot></slot>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script lang="ts" setup name="Modal">
import useDOMCreate from '../../hooks/useDOMCreate';
useDOMCreate('lew-modal');

defineProps({
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
});

const emit = defineEmits(['maskClick', 'confirm']);

const maskClick = () => {
    emit('maskClick');
};
</script>

<style lang="scss" scoped>
.lew-modal {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.35);
    outline: 1000000px solid rgba($color: #000000, $alpha: 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2001;
    .lew-modal-box {
        border-radius: var(--lew-border-radius);
        background-color: #fff;
        box-shadow: 0px 15px 50px rgba($color: #000000, $alpha: 0.05);
    }
}
.lew-modal-enter-active,
.lew-modal-leave-active {
    transition: all 0.25s ease;
}
.lew-modal-enter-from,
.lew-modal-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
