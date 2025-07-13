<script lang="ts" setup name="Modal">
import { useMagicKeys, onClickOutside } from '@vueuse/core'
import { any2px, getUniqueId } from 'lew-ui/utils'
import { LewFlex, LewButton, LewTextTrim } from 'lew-ui'
import { useDOMCreate } from 'lew-ui/hooks'
import { modalProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'
import { locale } from 'lew-ui'
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from 'vue'
const { Escape } = useMagicKeys()

const emit = defineEmits(['close'])

useDOMCreate('lew-modal')

const props = defineProps(modalProps)

const visible: Ref<boolean | undefined> = defineModel('visible')

const modalBodyRef = ref(null)
const modalId = `lew-modal-${getUniqueId()}`

// 用于强制重新计算顶层状态的响应式变量
const recomputeTrigger = ref(0)

// 计算当前 modal 是否在顶层
const isTopModal = computed(() => {
    // 添加 recomputeTrigger 作为依赖，确保能够触发重新计算
    recomputeTrigger.value

    if (!visible.value) {
        return false
    }

    const modalEl = document.getElementById(modalId)
    if (!modalEl) {
        return false
    }

    // 检查是否有 dialog 在顶层
    const dialogEl = document.getElementById('lew-dialog')
    const hasDialog = dialogEl && dialogEl.children.length > 0
    if (hasDialog) {
        return false
    }

    // 获取所有 modal 元素
    const modalContainer = modalEl?.parentElement
    if (!modalContainer) {
        return false
    }

    const openModals = Array.from(modalContainer.childNodes)
        .filter((e): e is Element => e instanceof Element)
        .filter((e) => e.children.length > 0)
        .filter((e) => {
            // 只考虑可见的 modal
            const modalBody = e.querySelector('.lew-modal') as HTMLElement
            return modalBody && modalBody.style.display !== 'none'
        })

    // 检查当前 modal 是否是最后一个（顶层）
    return (
        openModals.length > 0 &&
        openModals[openModals.length - 1]?.id === modalId
    )
})

// 强制重新计算顶层状态的函数
const forceRecomputeTopModal = () => {
    recomputeTrigger.value++
}

// 监听 modalBodyRef 变化，确保在 DOM 更新后重新计算顶层状态
watch(
    modalBodyRef,
    async (newVal) => {
        if (newVal && visible.value) {
            await nextTick()
            forceRecomputeTopModal()
        }
    },
    { immediate: true },
)

// 监听 visible 变化，确保状态正确更新
watch(visible, async (newVal) => {
    await nextTick()
    // modal 状态变化时，强制重新计算
    forceRecomputeTopModal()

    // 控制全局检查定时器
    if (newVal) {
        startGlobalCheck()
    } else {
        stopGlobalCheck()
    }
})

// 监听全局 modal 状态变化（通过定时器检查）
let globalCheckTimer: ReturnType<typeof setInterval> | null = null

const startGlobalCheck = () => {
    if (globalCheckTimer) {
        clearInterval(globalCheckTimer)
    }

    globalCheckTimer = setInterval(() => {
        if (visible.value) {
            forceRecomputeTopModal()
        }
    }, 100) // 每100ms检查一次
}

const stopGlobalCheck = () => {
    if (globalCheckTimer) {
        clearInterval(globalCheckTimer)
        globalCheckTimer = null
    }
}

onMounted(() => {
    if (visible.value) {
        startGlobalCheck()
    }
})

onUnmounted(() => {
    stopGlobalCheck()
})

onClickOutside(modalBodyRef, (e) => {
    if (visible.value && props.closeOnClickOverlay) {
        const { parentElement } = e?.target as Element
        if (parentElement?.id === modalId) {
            visible.value = false
        }
    }
})

const getModalStyle = computed(() => {
    const { width, top } = props
    return {
        width: any2px(width),
        top: any2px(top),
    }
})

const close = () => {
    visible.value = false
    emit('close')
}

if (props.closeByEsc) {
    watch(Escape, (v) => {
        if (!visible.value || !v || !isTopModal.value) {
            return
        }

        visible.value = false
    })
}
</script>

<template>
    <teleport to="#lew-modal">
        <div class="lew-modal-container" :id="modalId">
            <transition name="lew-modal-mask">
                <div
                    :style="{ zIndex }"
                    v-if="visible"
                    class="lew-modal-mask"
                ></div>
            </transition>
            <transition name="lew-modal">
                <div v-if="visible" :style="{ zIndex }" class="lew-modal">
                    <div
                        ref="modalBodyRef"
                        :style="getModalStyle"
                        class="lew-modal-body"
                    >
                        <div v-if="$slots.header" class="lew-modal-header-slot">
                            <slot name="header"></slot>
                        </div>
                        <lew-flex
                            v-else-if="title"
                            mode="between"
                            y="center"
                            class="lew-modal-header"
                        >
                            <lew-text-trim
                                class="lew-modal-title"
                                :text="title"
                            />
                            <lew-button
                                type="light"
                                color="gray"
                                round
                                single-icon
                                size="small"
                                class="lew-modal-icon-close"
                                @click="close"
                            >
                                <Icon :size="14" type="close" />
                            </lew-button>
                        </lew-flex>
                        <div
                            class="lew-modal-body-main lew-scrollbar"
                            :style="{ maxHeight: maxHeight }"
                        >
                            <slot></slot>
                        </div>
                        <div v-if="$slots.footer" class="lew-modal-footer-slot">
                            <slot name="footer"></slot>
                        </div>
                        <lew-flex
                            v-else-if="!hideFooter"
                            x="end"
                            y="center"
                            class="lew-modal-footer"
                        >
                            <lew-button
                                v-bind="{
                                    size: 'small',
                                    type: 'light',
                                    color: 'gray',
                                    text: locale.t('modal.closeText'),
                                    request: close,
                                    ...(closeButtonProps as any),
                                }"
                            />
                            <lew-button
                                v-bind="{
                                    size: 'small',
                                    text: locale.t('modal.okText'),
                                    color: 'primary',
                                    ...(okButtonProps as any),
                                }"
                            />
                        </lew-flex>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
.lew-modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--lew-modal-bgcolor);
}

.lew-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: start;

    .lew-modal-body {
        position: relative;
        border-radius: var(--lew-border-radius-large);
        background-color: var(--lew-modal-body-bgcolor);
        overflow: hidden;
        .lew-modal-body-main {
            overflow-y: auto;
        }
        .lew-modal-header {
            position: relative;
            padding: 15px 20px;

            .lew-modal-title {
                font-size: 16px;
                font-weight: bold;
            }
            .lew-modal-icon-close {
                position: absolute;
                width: auto;
                height: auto;
                padding: 5px;
                top: 10px;
                right: 10px;
            }
        }

        .lew-modal-footer {
            padding: 20px;
        }

        .lew-modal-header-slot {
            background-color: var(--lew-bgcolor-1);
        }

        .lew-modal-footer-slot {
            background-color: var(--lew-bgcolor-1);
        }
    }
}

.lew-modal-mask-enter-active,
.lew-modal-mask-leave-active {
    transition: all 0.1s;
}

.lew-modal-mask-enter-from,
.lew-modal-mask-leave-to {
    opacity: 0;
}

.lew-modal-enter-active,
.lew-modal-leave-active {
    transition: all var(--lew-form-transition-bezier);
}

.lew-modal-leave-to,
.lew-modal-enter-from {
    opacity: 0;
    transform: translateY(30px);
}
</style>
