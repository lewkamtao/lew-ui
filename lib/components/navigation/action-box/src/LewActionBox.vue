<script setup lang="ts">
import type { LewActionBoxOption, LewContextMenusOption } from 'lew-ui/types'
import { LewDropdown, LewFlex } from 'lew-ui'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { parseDimension } from 'lew-ui/utils'
import { isValidComponent } from 'lew-ui/utils/render'
import { actionBoxEmits } from './emits'
import { actionBoxProps } from './props'

const props = defineProps(actionBoxProps)
const emit = defineEmits(actionBoxEmits)

const threshold = computed((): number => parseDimension(props.dropdownThreshold || 0))

const visibleOptions = computed((): LewActionBoxOption[] => {
  if (!props.options)
    return []
  if (threshold.value <= 0) {
    return props.options
  }
  return props.options.slice(0, threshold.value)
})

function convertToContextMenus(options: LewActionBoxOption[]): LewContextMenusOption[] {
  return options.map(option => ({
    label: option.label,
    icon: option.icon,
    onClick: (item: LewContextMenusOption) => {
      const originalOption = options.find(
        opt => (typeof opt.label === 'string' ? opt.label : '') === item.label,
      )
      if (originalOption?.onClick) {
        originalOption.onClick()
      }
    },
  }))
}

const dropdownOptions = computed((): LewContextMenusOption[] => {
  if (!props.options || threshold.value <= 0) {
    return []
  }
  return convertToContextMenus(props.options.slice(threshold.value))
})

function handleOptionClick(option: LewActionBoxOption, event: MouseEvent): void {
  option.onClick?.(event)
  emit('click', option, event)
}
</script>

<template>
  <LewFlex class="lew-action-box" gap="5px" :x="props.x">
    <template v-for="(option, index) in visibleOptions" :key="index">
      <RenderComponent
        v-if="isValidComponent(option.customRender)"
        :render-fn="option.customRender"
        @click="(event: MouseEvent) => handleOptionClick(option, event)"
      />
      <div
        v-else
        class="lew-action-box-item"
        @click="(event: MouseEvent) => handleOptionClick(option, event)"
      >
        <RenderComponent
          v-if="option.icon && !props.iconOnly"
          :render-fn="option.icon"
          class="lew-action-box-icon"
        />
        <RenderComponent v-if="!props.iconOnly" :render-fn="option.label" />
        <RenderComponent
          v-else
          :render-fn="option.icon || option.label"
          class="lew-action-box-icon"
        />
      </div>
      <i
        v-if="
          props.divider
            && (dropdownOptions.length > 0
              || (visibleOptions.length === (props.options?.length || 0)
                && index !== (props.options?.length || 0) - 1))
        "
        class="lew-action-box-divider"
      />
    </template>
    <LewDropdown v-if="dropdownOptions.length > 0" :options="dropdownOptions">
      <div class="lew-action-box-item">
        <RenderComponent
          v-if="props.dropdownIcon"
          :render-fn="props.dropdownIcon"
          class="lew-action-box-icon"
        />
        <RenderComponent v-if="!props.iconOnly" :render-fn="props.dropdownLabel" />
      </div>
    </LewDropdown>
  </LewFlex>
</template>

<style lang="scss" scoped>
.lew-action-box {
  position: relative;

  .lew-action-box-item {
    display: inline-flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
    padding: 3px 4px;
    color: var(--lew-color-primary-text-text);
    white-space: nowrap;
    border-radius: var(--lew-border-radius-small);
    cursor: pointer;
    transition: all var(--lew-form-transition-bezier);
    user-select: none;

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
