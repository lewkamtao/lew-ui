<script setup lang="ts">
import type { LewMenuOption } from 'lew-ui'
import { LewTag } from 'lew-ui'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { toRaw } from 'vue'
import { menuEmits } from './emits'
import { menuProps } from './props'

const props = defineProps(menuProps)
const emit = defineEmits(menuEmits)

const modelValue = defineModel<string>('modelValue', {
  required: false,
  default: '',
})

function select(item: LewMenuOption) {
  modelValue.value = item.value || ''
  emit('change', toRaw(item))
}
</script>

<template>
  <div class="lew-menu">
    <template v-for="item in props.options" :key="item.label">
      <div class="lew-menu-item">
        <RenderComponent
          :render-fn="item.label"
          type="text-trim"
          :component-props="{
            placement: 'right',
            delay: [250, 250],
          }"
        />
        <LewTag
          v-if="item.tagProps?.text"
          v-bind="{
            ...item.tagProps,
            size: item.tagProps.size || 'small',
          }"
        />
      </div>
      <template v-for="(cItem, index) in item.children" :key="cItem.label">
        <div
          class="lew-menu-item lew-menu-item-child"
          :class="{
            'lew-menu-item-last':
              item.children && index === item.children.length - 1,
            'lew-menu-item-active': cItem.value === modelValue,
          }"
          @click="select(cItem)"
        >
          <RenderComponent :render-fn="cItem.icon" class="lew-menu-icon" />
          <RenderComponent
            class="lew-menu-item-text"
            :render-fn="cItem.label"
            type="text-trim"
            :component-props="{
              placement: 'right',
              delay: [250, 250],
            }"
          />
          <LewTag
            v-if="cItem.tagProps?.text"
            v-bind="{
              ...cItem.tagProps,
              size: cItem.tagProps.size || 'small',
            }"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.lew-menu {
  --lew-menu-item-bg: var(--lew-color-menu-primary-item-bg);
  --lew-menu-item-bg-hover: var(--lew-color-menu-primary-item-bg-hover);
  --lew-menu-item-text: var(--lew-color-menu-primary-item-text);
  --lew-menu-item-text-hover: var(--lew-color-menu-primary-item-text-hover);
  --lew-menu-item-selected-bg: var(--lew-color-menu-primary-item-selected-bg);
  --lew-menu-item-selected-text: var(--lew-color-menu-primary-item-selected-text);
  --lew-menu-item-icon: var(--lew-color-menu-primary-item-icon);
  --lew-menu-item-icon-hover: var(--lew-color-menu-primary-item-icon-hover);
  --lew-menu-item-icon-selected: var(--lew-color-menu-primary-item-icon-selected);

  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: var(--lew-border-radius-small);
  padding: 2px 6px;
  margin: 0px 3px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  height: auto;
  max-width: 300px;

  .lew-menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--lew-text-color-5);
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    font-weight: 400;
    padding: 0px 15px;
    box-sizing: border-box;
  }

  .lew-menu-item-child {
    color: var(--lew-menu-item-text);
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    border-radius: var(--lew-border-radius-small);
    background-color: var(--lew-menu-item-bg);

    :deep(.lew-menu-icon) {
      flex-shrink: 0;
      color: var(--lew-menu-item-icon);
    }
  }

  .lew-menu-item-child:hover:not(.lew-menu-item-active) {
    background-color: var(--lew-menu-item-bg-hover);
    color: var(--lew-menu-item-text-hover);

    :deep(.lew-menu-icon) {
      color: var(--lew-menu-item-icon-hover);
    }
  }

  .lew-menu-item-child.lew-menu-item-active {
    background-color: var(--lew-menu-item-selected-bg);

    .lew-menu-item-text {
      color: var(--lew-menu-item-selected-text);
    }

    :deep(.lew-menu-icon) {
      color: var(--lew-menu-item-selected-text);
    }
  }

  .lew-menu-item-last {
    margin-bottom: 20px;
  }
}
</style>
