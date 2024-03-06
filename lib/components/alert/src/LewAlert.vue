<script setup lang="ts">
    import { getIconType, object2class } from 'lew-ui/utils';
    import type { AlertItem } from './props';
    import { alertProps } from './props';
    import { LewIcon } from 'lew-ui';

    defineProps(alertProps);

    const emit = defineEmits(['close']);

    const alertClassName = (item: AlertItem) => {
        return object2class('lew-alert', { type: item.type });
    };
</script>

<template>
    <div class="lew-alert-group">
        <div v-for="(item, i) in list" :key="i" class="lew-alert" :class="alertClassName(item)">
            <div class="alert-icon">
                <lew-icon :size="16" :type="getIconType(item.type)"></lew-icon>
            </div>
            <div class="message">
                <div class="title">{{ item.title }}</div>
                <div v-show="item.content" class="content">
                    {{ item.content }}
                </div>
            </div>
            <lew-icon
                v-if="item.closeable"
                :size="16"
                class="lew-form-icon-clear"
                type="x"
                @click="emit('close', i)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .lew-alert-group {
        width: 100%;
        display: flex;
        flex-direction: column;

        .lew-alert {
            position: relative;
            display: inline-flex;
            align-items: flex-start;
            width: 100%;
            min-height: 32px;
            background-color: var(--lew-color-normal);
            border-radius: var(--lew-border-radius);
            margin-bottom: 10px;
            padding: 12px 18px;
            box-sizing: border-box;

            .alert-icon {
                margin: 2px 5px 0px 0px;
                display: inline-flex;
                align-items: center;
            }

            .lew-form-icon-clear {
                top: 11px;
                right: 11px;
                transform: none;
            }

            .message {
                width: calc(100% - 80px);
                margin-left: 5px;

                .title {
                    font-size: 14px;
                    width: 100%;
                    word-wrap: break-word;
                    white-space: pre-line;
                    font-weight: 400;
                }

                .content {
                    margin-top: 8px;
                    font-size: 14px;
                    width: 100%;
                    font-weight: 300;
                    word-wrap: break-word;
                    white-space: pre-line;
                }
            }
        }

        .lew-alert-type-normal {
            color: var(--lew-text-color-2);
            background-color: var(--lew-color-normal-light);
        }

        .lew-alert-type-success {
            color: var(--lew-color-success-dark);
            background-color: var(--lew-color-success-light);
        }

        .lew-alert-type-warning {
            color: var(--lew-color-warning-dark);
            background-color: var(--lew-color-warning-light);
        }

        .lew-alert-type-error {
            color: var(--lew-color-error-dark);
            background-color: var(--lew-color-error-light);
        }

        .lew-alert-type-info {
            color: var(--lew-color-info-dark);
            background-color: var(--lew-color-info-light);
        }
    }
</style>
