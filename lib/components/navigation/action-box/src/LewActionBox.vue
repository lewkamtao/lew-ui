<script setup lang="ts">
import { LewDropdown, LewFlex } from 'lew-ui'
import { isValidComponent } from 'lew-ui/utils'
import RenderComponent from 'lew-ui/utils/RenderComponent.vue'
import { actionBoxProps } from './props'

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
  <LewFlex class="lew-action-box" :gap="5" :x="x">
    <template v-for="(option, index) in visibleOptions" :key="index">
      <RenderComponent
        v-if="isValidComponent(option.customRender)"
        :render-fn="option.customRender"
        @click="option.onClick?.()"
      />
      <div v-else class="lew-action-box-item" @click="option.onClick?.()">
        <RenderComponent
          :render-fn="option.icon"
          class="lew-action-box-icon"
        />
        <RenderComponent
          :render-fn="option.label"
        />
      </div>
      <i
        v-if="
          divider
            && (dropdownOptions.length > 0
              || (visibleOptions.length === options.length && index !== options.length - 1))
        "
        class="lew-action-box-divider"
      />
    </template>
    <LewDropdown v-if="dropdownOptions.length > 0" :options="dropdownOptions">
      <div class="lew-action-box-item">
        <RenderComponent
          :render-fn="dropdownIcon"
          class="lew-action-box-icon"
        />
        <RenderComponent
          :render-fn="dropdownLabel"
        />
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
