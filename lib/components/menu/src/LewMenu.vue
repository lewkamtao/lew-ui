<script lang="ts" setup>
import { LewTextTrim, LewTag } from 'lew-ui';
import type { MenuOptions } from './props';
import { menuProps } from './props';
import { isVueComponent, formatComponent } from 'lew-ui/utils';
defineProps(menuProps);

const modelValue = defineModel();

const emit = defineEmits(['change']);

const select = (item: MenuOptions) => {
  modelValue.value = item.value;
  emit('change', item);
};
</script>

<template>
  <div class="lew-menu">
    <template v-for="item in options" :key="item.label">
      <div class="lew-menu-item">
        <lew-text-trim :text="item.label" />
        <lew-tag
          v-if="item.tagProps?.text"
          v-bind="{ ...item.tagProps, size: item.tagProps.size || 'small' }"
        ></lew-tag>
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
          <component
            v-if="isVueComponent(cItem.icon)"
            class="lew-menu-icon"
            :is="formatComponent(cItem.icon)"
          />
          <lew-text-trim :text="cItem.label" />
          <lew-tag
            v-if="cItem.tagProps?.text"
            v-bind="{ ...cItem.tagProps, size: cItem.tagProps.size || 'small' }"
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
