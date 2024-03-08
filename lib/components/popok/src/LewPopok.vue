<!-- filename: Popover.vue -->
<script setup lang="ts">
    import { LewButton, LewPopover } from 'lew-ui';
    import { any2px } from 'lew-ui/utils';
    import { popokProps } from './props';

    const props = defineProps(popokProps);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lewPopoverRef = ref();

    const ok = () => {
        if (!props.okProps.request) {
            hide();
        }
        emit('ok');
    };

    const cancel = () => {
        if (!props.cancelProps.request) {
            hide();
        }
        emit('cancel');
    };

    const hide = () => {
        lewPopoverRef.value.hide();
    };
    defineExpose({ hide });

    const emit = defineEmits(['show', 'ok', 'cancel']);
</script>

<template>
    <lew-popover
        ref="lewPopoverRef"
        class="lew-popok"
        :trigger="trigger"
        :placement="placement"
        @show="emit('show')"
    >
        <template #trigger>
            <slot />
        </template>
        <template #popover-body>
            <div
                class="lew-popok-body"
                :style="{
                    width: any2px(width)
                }"
            >
                <div class="left">
                    <div :class="`icon-${type}`">
                        <lew-icon
                            v-if="type === `normal`"
                            size="22"
                            type="light"
                            color="blue"
                        ></lew-icon>
                        <lew-icon
                            v-if="type === `warning`"
                            size="22"
                            type="alert-triangle"
                        ></lew-icon>
                        <lew-icon v-if="type === `success`" size="22" type="check"></lew-icon>
                        <lew-icon v-if="type === `error`" size="22" type="alert-circle"></lew-icon>
                        <lew-icon v-if="type === `info`" size="22" type="bell"></lew-icon>
                    </div>
                </div>
                <div class="right">
                    <div v-if="title" class="title">{{ title }}</div>
                    <div v-if="content" class="content">{{ content }}</div>
                    <div class="footer">
                        <lew-button
                            v-bind="{ 
                                type: 'text', 
                                text: '取消',
								round: true,
								color: 'normal',
								size: 'small',
                                ...cancelProps as any,
                            }"
                            @click="cancel"
                        />
                        <lew-button
                            v-bind="{  
                                text: '确定',   
                                color: 'primary',  
								round: true,
								size: 'small',
                                ...okProps as any, 
                            }"
                            @click="ok"
                        />
                    </div>
                </div>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
    .lew-popok {
        display: inline-block;
    }

    .lew-popok-body {
        display: flex;
        padding: 15px;

        .left {
            width: 30px;
            margin-right: 5px;

            .icon-success {
                color: var(--lew-color-success-dark);
            }

            .icon-warning {
                color: var(--lew-color-warning-dark);
            }

            .icon-normal {
                color: var(--lew-color-normal-dark);
            }

            .icon-info {
                color: var(--lew-color-info-dark);
            }

            .icon-error {
                color: var(--lew-color-error-dark);
            }
        }

        .right {
            width: calc(100% - 30px);

            .title {
                width: 100%;
                font-weight: 600;
                margin-bottom: 5px;
            }

            .content {
                width: 100%;
                font-size: 14px;
                margin-bottom: 10px;
            }

            .footer {
                width: 100%;
                display: flex;
                justify-content: end;

                .lew-button {
                    margin-left: 10px;
                }
            }
        }
    }
</style>
