<script setup lang="ts">
    import { LewIcon } from 'lew-ui';
    import { object2class, getColorType } from 'lew-ui/utils';
    import { buttonProps } from './props';

    const emit = defineEmits(['click']);
    const props = defineProps(buttonProps);

    const _loading = ref(false);

    const handleClick = async (e: MouseEvent) => {
        if (props.disabled || _loading.value || props.loading) return;
        emit('click', e);
        if (typeof props.request === 'function') {
            if (_loading.value) {
                return;
            }
            _loading.value = true;
            await props.request();
            _loading.value = false;
        }
    };
    const instance = getCurrentInstance();
    const hasDefaultSlot = ref(false);

    if (instance?.slots.default) {
        hasDefaultSlot.value = true;
    }

    const getButtonClass = computed(() => {
        const { size, type, icon, text, color } = props;
        const loading = _loading.value || props.loading;
        const singleIcon = !!(!text && icon && !hasDefaultSlot.value);
        return object2class('lew-button', {
            size,
            type,
            loading,
            singleIcon,
            color
        });
    });

    const getIconSize = computed(() => {
        const { size } = props;
        switch (size) {
            case 'small':
                return 12;
            case 'medium':
                return 14;
            case 'large':
                return 16;
            default:
                return 14;
        }
    });

    const getStyle = computed(() => {
        const { round, type, color } = props;
        const styleObj: Record<string, string> = {};
        const _color = getColorType(color) || 'primary';
        switch (type) {
            case 'fill':
                styleObj.backgroundColor = `var(--lew-color-${_color})`;
                styleObj.color = 'var(--lew-color-white)';
                break;
            case 'light':
                styleObj.backgroundColor = `var(--lew-color-${_color}-light)`;
                styleObj.color = `var(--lew-color-${_color}-dark)`;
                break;
            case 'ghost':
                styleObj.backgroundColor = 'transparent';
                styleObj.border = `1px solid var(--lew-color-${_color})`;
                styleObj.color = `var(--lew-color-${_color}-dark)`;
                styleObj.boxShadow = 'none';
                break;
            case 'text':
                styleObj.backgroundColor = 'transparent';
                styleObj.color = `var(--lew-color-${_color}-dark)`;
                styleObj.boxShadow = 'none';
                break;
            default:
                styleObj.backgroundColor = `var(--lew-color-${_color})`;
                break;
        }
        styleObj.borderRadius = round ? '50px' : 'none';
        return styleObj;
    });
</script>

<template>
    <button
        class="lew-button"
        :class="getButtonClass"
        :disabled="disabled"
        :style="getStyle"
        @click="handleClick"
    >
        <template v-if="iconPosition === 'left'">
            <lew-icon v-if="icon" class="lew-button-icon" :size="getIconSize" :type="icon" />
            <div
                class="lew-loading-icon"
                :class="{
                    'lew-loading-isShow': (_loading || loading) && !disabled
                }"
            >
                <lew-icon
                    v-if="!$slots.default && !text"
                    :size="getIconSize"
                    animation="spin"
                    animation-speed="fast"
                    type="loader"
                />
            </div>
        </template>
        <div v-if="$slots.default || text" class="lew-button-content">
            <div
                class="lew-loading-icon"
                :class="{
                    'lew-loading-isShow': (_loading || loading) && !disabled
                }"
            >
                <lew-icon
                    :size="getIconSize"
                    animation="spin"
                    animation-speed="fast"
                    type="loader"
                />
            </div>
            <span class="lew-button-text">
                <template v-if="$slots.default">
                    <slot />
                </template>
                <template v-else>
                    {{ text }}
                </template>
            </span>
        </div>
        <template v-if="iconPosition === 'right'">
            <lew-icon v-if="icon" class="lew-button-icon" :size="getIconSize" :type="icon" />
            <lew-icon
                class="lew-loading-icon"
                :size="getIconSize"
                animation="spin"
                animation-speed="fast"
                :class="{
                    'lew-loading-isShow': (_loading || loading) && !disabled
                }"
                type="loader"
            />
        </template>
    </button>
</template>

<style lang="scss" scoped>
    .lew-button {
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        flex-shrink: 0;
        user-select: none;
        width: auto;
        white-space: nowrap;
        box-sizing: border-box;
        transition: transform 0.1s, color 0.35s cubic-bezier(0.65, 0, 0.25, 1),
            padding 0.15s cubic-bezier(0.65, 0, 0.25, 1);
        border: none;
        cursor: pointer;
        border-radius: var(--lew-border-radius-small);
        box-sizing: border-box;
        overflow: hidden;

        .lew-loading-icon {
            position: absolute;
            opacity: 0;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease-in-out;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .lew-loading-isShow {
            opacity: 1;
        }
        .lew-button-content {
            position: relative;
            z-index: 2;
            .lew-loading-icon {
                left: -20px;
                transform: translateY(-50%);
            }
        }

        .lew-loading-isShow {
            opacity: 1;
        }
    }

    .lew-button::after {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.2);
        transition: 0.1s all;
        opacity: 0;
        content: '';
    }

    .lew-button-color-black::after {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: 0.2);
        transition: 0.1s all;
        opacity: 0;
        content: '';
    }

    .lew-button-type-text.lew-button-color-black::after {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000, $alpha: 0.2);
        transition: 0.1s all;
        opacity: 0;
        content: '';
    }

    .lew-button-type-ghost::after {
        display: none;
    }

    .lew-button:hover:after {
        opacity: 0.4;
    }

    .lew-button:active {
        opacity: 1;
    }

    .lew-button:active::after {
        opacity: 1;
    }

    .lew-button-size-small {
        min-width: 50px;
        height: var(--lew-form-item-height-small);
        line-height: var(--lew-form-item-height-small);
        padding: 0px 8px;
        font-size: var(--lew-form-font-size-small);
        gap: 4px;
        .lew-button-content {
            .lew-loading-icon {
                left: -16px;
            }
        }
    }

    .lew-button-size-medium {
        min-width: 60px;
        height: var(--lew-form-item-height-medium);
        line-height: var(--lew-form-item-height-medium);
        padding: 0px 14px;
        font-size: var(--lew-form-font-size-medium);
        gap: 6px;
        .lew-button-content {
            .lew-loading-icon {
                left: -18px;
            }
        }
    }

    .lew-button-size-large {
        min-width: 70px;
        height: var(--lew-form-item-height-large);
        line-height: var(--lew-form-item-height-large);
        padding: 0px 20px;
        font-size: var(--lew-form-font-size-large);
        gap: 8px;
        .lew-button-content {
            .lew-loading-icon {
                left: -20px;
            }
        }
    }

    .lew-button-size-small.lew-button-singleIcon {
        min-width: auto;
        padding: 0px;
        width: var(--lew-form-item-height-small);
        height: var(--lew-form-item-height-small);
    }

    .lew-button-size-medium.lew-button-singleIcon {
        min-width: auto;
        padding: 0px;
        width: var(--lew-form-item-height-medium);
        height: var(--lew-form-item-height-medium);
    }

    .lew-button-size-large.lew-button-singleIcon {
        min-width: auto;
        padding: 0px;
        width: var(--lew-form-item-height-large);
        height: var(--lew-form-item-height-large);
    }

    .lew-button.lew-button-loading.lew-button-singleIcon {
        padding: 0px;

        .lew-button-text {
            display: none;
        }

        .lew-button-icon {
            display: none;
        }
    }

    .lew-button-loading {
        cursor: progress;
        padding-left: 0px;
    }

    .lew-button-size-small.lew-button-loading {
        padding-left: 24px;
    }

    .lew-button-size-medium.lew-button-loading {
        padding-left: 30px;
    }

    .lew-button-size-large.lew-button-loading {
        padding-left: 36px;
    }

    .lew-button-loading:active {
        transform: scale(1);
    }

    .lew-button[disabled] {
        pointer-events: none; //鼠标点击不可修改
        opacity: var(--lew-disabled-opacity);
    }
    .lew-button-type-ghost:hover {
        background-color: var(--lew-bgcolor-2) !important;
    }
    .lew-button-type-ghost:active {
        background-color: var(--lew-color-normal-light) !important;
    }
</style>
<style lang="scss">
    .lew-dark .lew-button-color-black.lew-button-type-fill {
        color: #000 !important;
    }
</style>
