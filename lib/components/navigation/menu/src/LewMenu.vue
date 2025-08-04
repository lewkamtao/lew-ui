<script lang="ts" setup>
import type { LewMenuOptions } from 'lew-ui'
import { LewTag } from 'lew-ui'
import { RenderComponent } from 'lew-ui/render'
import { menuProps } from './props'

defineProps(menuProps)

const emit = defineEmits<{
  change: [item: LewMenuOptions]
}>()

const modelValue = defineModel()

function select(item: LewMenuOptions) {
  modelValue.value = item.value
  emit('change', item)
}
</script>

<template>
  <div class="lew-menu">
    <template v-for="item in options" :key="item.label">
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
            'lew-menu-item-last': item.children && index === item.children.length - 1,
            'lew-menu-item-active': cItem.value === modelValue,
          }"
          @click="select(cItem)"
        >
          <RenderComponent :render-fn="cItem.icon" class="lew-menu-icon" />
          <RenderComponent
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
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 4px;
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
    color: var(--lew-text-color-1);
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    border-radius: var(--lew-border-radius-small);
    transition:
      background-color 0.25s,
      color 0.25s;
  }
  :deep(.lew-menu-icon) {
    flex-shrink: 0;
  }
  .lew-menu-item-child:hover {
    background-color: var(--lew-form-bgcolor-hover);
    color: var(--lew-text-color-1);
  }
  .lew-menu-item-active {
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
    font-weight: bold;
  }
  .lew-menu-item-active:hover {
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
  }
  .lew-menu-item-last {
    margin-bottom: 20px;
  }
}
</style>
