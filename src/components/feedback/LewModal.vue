<template>
    <teleport to="#lew-modal">
        <transition name="fade">
            <div class="lew-modal" @click="maskClick" v-if="visible">
                <div
                    v-if="visible"
                    @click.stop
                    class="lew-modal-box"
                    :style="`width:${width};height:${height}`"
                >
                    <slot></slot>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script lang="ts" setup name="Modal">
import useDOMCreate from '../hooks/useDOMCreate';
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
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0px 15px 50px rgba($color: #000000, $alpha: 0.05);
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
