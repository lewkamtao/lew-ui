<script setup lang="ts">
import type { ContextMenus } from 'lew-ui'
import type { ActionBoxOption } from './props'
import { LewDropdown, LewFlex } from 'lew-ui'
import { isValidComponent, RenderComponent } from 'lew-ui/render'
import { computed } from 'vue'
import { actionBoxProps } from './props'

// Props & Emits
const props = defineProps(actionBoxProps)

// Computed
const threshold = computed((): number => Number(props.dropdownThreshold || 0))

const visibleOptions = computed((): ActionBoxOption[] => {
  if (threshold.value <= 0) {
    return props.options
  }
  return props.options.slice(0, threshold.value)
})

// Methods
function convertToContextMenus(options: ActionBoxOption[]): ContextMenus[] {
  return options.map(option => ({
    label: option.label,
    icon: option.icon,
    onClick: (item: ContextMenus) => {
      // Find original option for proper callback
      const originalOption = options.find(opt =>
        (typeof opt.label === 'string' ? opt.label : '') === item.label,
      )
      if (originalOption?.onClick) {
        originalOption.onClick()
      }
    },
  }))
}

const dropdownOptions = computed((): ContextMenus[] => {
  if (threshold.value <= 0) {
    return []
  }
  return convertToContextMenus(props.options.slice(threshold.value))
})

function handleOptionClick(option: ActionBoxOption, event: MouseEvent): void {
  option.onClick?.(event)
}
</script>

<template>
  <LewFlex class="lew-action-box" gap="5px" :x="x">
    <template v-for="(option, index) in visibleOptions" :key="index">
      <RenderComponent
        v-if="isValidComponent(option.customRender)" :render-fn="option.customRender"
        @click="(event: MouseEvent) => handleOptionClick(option, event)"
      />
      <div v-else class="lew-action-box-item" @click="(event: MouseEvent) => handleOptionClick(option, event)">
        <RenderComponent v-if="option.icon && !iconOnly" :render-fn="option.icon" class="lew-action-box-icon" />
        <RenderComponent v-if="!iconOnly" :render-fn="option.label" />
        <RenderComponent v-else :render-fn="option.icon || option.label" class="lew-action-box-icon" />
      </div>
      <i
        v-if="
          divider
            && (dropdownOptions.length > 0
              || (visibleOptions.length === options.length && index !== options.length - 1))
        " class="lew-action-box-divider"
      />
    </template>
    <LewDropdown v-if="dropdownOptions.length > 0" :options="dropdownOptions">
      <div class="lew-action-box-item">
        <RenderComponent v-if="dropdownIcon" :render-fn="dropdownIcon" class="lew-action-box-icon" />
        <RenderComponent v-if="!iconOnly" :render-fn="dropdownLabel" />
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
    color: var(--lew-color-primary-dark);
    white-space: nowrap;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease;
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
