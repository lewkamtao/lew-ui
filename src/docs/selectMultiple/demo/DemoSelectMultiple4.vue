<script setup lang="ts">
    import { schools } from './schools';
    import _ from 'lodash';

    const schoolsOptions = schools.map((e, i) => {
        return { label: e, value: _.padStart(String(i), 8, '0') };
    });

    const value = ref('');
</script>

<template>
    <lew-select-multiple
        v-model="value"
        style="width: 320px"
        :item-height="48"
        clearable
        :options="schoolsOptions"
        placeholder="支持插槽"
    >
        <template #item="{ props }">
            <div class="custom-select-box" :class="{ 'custom-select-checked': props.checked }">
                <div class="custom-select-content">
                    <lew-avatar
                        round
                        width="30"
                        height="30"
                        :src="`https://api.lew.kamtao.com/manage/common/avatar/350/4B78CA/${props.label}`"
                    />
                    <div class="info">
                        <div class="label"
                            >{{ props.label }} {{ props.checked ? '（已选择）' : '' }}</div
                        >
                        <div class="desc">
                            {{ props.value }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </lew-select-multiple>
</template>

<style lang="scss">
    .custom-select-box {
        width: 100%;
        height: 48px;
        user-select: none;
        padding: 2px 0px;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        .custom-select-content {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0px 8px;
            height: 100%;
            border-radius: var(--lew-border-radius-small);
            box-sizing: border-box;
            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                .label {
                    color: var(--lew-text-color-1);
                    font-size: 14px;
                }
                .desc {
                    color: var(--lew-text-color-8);
                    font-size: 12px;
                }
            }
        }
    }
    .custom-select-box:hover {
        .custom-select-content {
            background: var(--lew-color-primary-light);
        }
    }
    .custom-select-checked {
        .custom-select-content {
            background: var(--lew-color-primary-light);
        }
    }
</style>
