<script setup lang="ts">
import { actionBoxProps } from "./props";
import { computed } from "vue";
import { isString, isFunction } from "lodash-es";
import { isVueComponent } from "lew-ui/utils";

const props = defineProps(actionBoxProps);

const visibleOptions = computed(() => {
  if (props.dropdownThreshold <= 0) {
    return props.options;
  }
  return props.options.slice(0, props.dropdownThreshold);
});

const dropdownOptions = computed(() => {
  if (props.dropdownThreshold <= 0) {
    return [];
  }
  return props.options.slice(props.dropdownThreshold);
});
</script>

<template>
  <lew-flex class="lew-action-box" :gap="4">
    <template v-for="option in visibleOptions">
      <component
        @click="option.onClick?.()"
        v-if="isVueComponent(option.customRender)"
        :is="
          isFunction(option.customRender)
            ? option.customRender()
            : option.customRender
        "
      />
      <div v-else @click="option.onClick?.()" class="lew-action-box-item">
        <component
          v-if="isVueComponent(option.icon)"
          :is="isFunction(option.icon) ? option.icon() : option.icon"
          class="lew-action-box-icon"
        />
        <component
          v-if="isVueComponent(option.label)"
          @click="option.onClick?.()"
          :is="isFunction(option.label) ? option.label() : option.label"
        />
        <template v-else>
          {{ option.label }}
        </template>
      </div>
      <i
        v-if="divider && dropdownOptions.length > 0"
        class="lew-action-box-divider"
      />
    </template>
    <lew-dropdown v-if="dropdownOptions.length > 0" :options="dropdownOptions">
      <div class="lew-action-box-item">
        <component
          v-if="isVueComponent(props.dropdownIcon)"
          :is="isFunction(props.dropdownIcon) ? props.dropdownIcon() : props.dropdownIcon"
          class="lew-action-box-icon"
        />
        <component
          v-if="isVueComponent(props.dropdownLabel)"
          :is="isFunction(props.dropdownLabel) ? props.dropdownLabel() : props.dropdownLabel"
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
    padding: 2px 5px;
    cursor: pointer;
    border-radius: 4px;
    color: var(--lew-color-primary-dark);
    user-select: none;
    transition: all 0.2s ease;
    gap: 4px;
    &:hover {
      background-color: var(--lew-form-bgcolor-hover);
    }
    &:active {
      background-color: var(--lew-form-bgcolor-active);
    }
    .lew-action-box-icon {
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
