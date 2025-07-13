<script setup lang="ts">
import { actionBoxProps } from './props'
import { computed } from 'vue'
import { isVueComponent, formatComponent } from 'lew-ui/utils'
import { LewDropdown, LewFlex } from 'lew-ui'
const props = defineProps(actionBoxProps)

const threshold = computed(() => Number(props.dropdownThreshold))

const visibleOptions = computed(() => {
    if (threshold.value <= 0) {
        return props.options
    }
    return props.options.slice(0, threshold.value)
})

const dropdownOptions: any = computed(() => {
    if (threshold.value <= 0) {
        return []
    }
    return props.options.slice(threshold.value)
})
</script>

<template>
    <lew-flex class="lew-action-box" :gap="5" :x="x">
        <template v-for="(option, index) in visibleOptions">
            <component
                @click="option.onClick?.()"
                v-if="isVueComponent(option.customRender)"
                :is="formatComponent(option.customRender)"
            />
            <div v-else @click="option.onClick?.()" class="lew-action-box-item">
                <component
                    v-if="isVueComponent(option.icon)"
                    :is="formatComponent(option.icon)"
                    class="lew-action-box-icon"
                />
                <component
                    v-if="isVueComponent(option.label) && !iconOnly"
                    :is="formatComponent(option.label)"
                />
                <template v-else-if="!iconOnly">
                    {{ option.label }}
                </template>
            </div>
            <i
                v-if="
                    divider &&
                    (dropdownOptions.length > 0 ||
                        (visibleOptions.length === options.length &&
                            index !== options.length - 1))
                "
                class="lew-action-box-divider"
            />
        </template>
        <lew-dropdown
            v-if="dropdownOptions.length > 0"
            :options="dropdownOptions"
        >
            <div class="lew-action-box-item">
                <component
                    v-if="isVueComponent(dropdownIcon)"
                    :is="formatComponent(dropdownIcon)"
                    class="lew-action-box-icon"
                />
                <component
                    v-if="isVueComponent(dropdownLabel)"
                    :is="formatComponent(dropdownLabel)"
                />
                <template v-else>
                    {{ dropdownLabel }}
                </template>
            </div>
        </lew-dropdown>
    </lew-flex>
</template>

<style lang="scss" scoped>
.lew-action-box {
    position: relative;
    .lew-action-box-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 3px 4px;
        cursor: pointer;
        border-radius: 5px;
        color: var(--lew-color-primary-dark);
        user-select: none;
        transition: all 0.2s ease;
        gap: 4px;
        white-space: nowrap;
        &:hover {
            background-color: var(--lew-form-bgcolor-hover);
        }
        &:active {
            background-color: var(--lew-form-bgcolor-active);
        }
        :deep(.lew-action-box-icon) {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
    }
    .lew-action-box-divider {
        width: 1px;
        height: 14px;
        background-color: var(--lew-form-bgcolor-hover);
    }
}
</style>
