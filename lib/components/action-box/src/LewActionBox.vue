<script setup lang="ts">
import { LewDropdown, LewFlex } from 'lew-ui'
import { formatComponent, isVueComponent } from 'lew-ui/utils'
import { computed } from 'vue'
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
      <component
        :is="formatComponent(option.customRender)"
        v-if="isVueComponent(option.customRender)"
        @click="option.onClick?.()"
      />
      <div v-else class="lew-action-box-item" @click="option.onClick?.()">
        <component
          :is="formatComponent(option.icon)"
          v-if="isVueComponent(option.icon)"
          class="lew-action-box-icon"
        />
        <component
          :is="formatComponent(option.label)"
          v-if="isVueComponent(option.label) && !iconOnly"
        />
        <template v-else-if="!iconOnly">
          {{ option.label }}
        </template>
      </div>
      <i
        v-if="
          divider
            && (dropdownOptions.length > 0
              || (visibleOptions.length === options.length
                && index !== options.length - 1))
        "
        class="lew-action-box-divider"
      />
    </template>
    <LewDropdown v-if="dropdownOptions.length > 0" :options="dropdownOptions">
      <div class="lew-action-box-item">
        <component
          :is="formatComponent(dropdownIcon)"
          v-if="isVueComponent(dropdownIcon)"
          class="lew-action-box-icon"
        />
        <component
          :is="formatComponent(dropdownLabel)"
          v-if="isVueComponent(dropdownLabel)"
        />
        <template v-else>
          {{ dropdownLabel }}
        </template>
      </div>
    </LewDropdown>
  </LewFlex>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>
