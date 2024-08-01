<script setup lang="ts">
import { LewFlex } from 'lew-ui/components'
interface ContextMenus {
  label: string
  icon: string
  value: string
  children: ContextMenus[]
  disabled?: boolean
  level?: number
  [key: string]: any
}

defineProps({
  menus: {
    type: Array as PropType<ContextMenus[]>,
    default: () => []
  }
})

const emit = defineEmits(['clickitem'])
console.log(2)

const clickItem = (item: ContextMenus) => {
  emit('clickitem', item)
}
</script>

<template>
  <lew-flex direction="y" gap="4" class="lew-context-menu">
    <div v-for="(item, index) in menus" :key="index" class="lew-context-menu-box">
      <div class="lew-context-menu-item">
        <div @click="clickItem(item)" class="lew-context-menu-label">
          {{ item.label }}
        </div>
      </div>
    </div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-context-menu {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;

  .lew-context-menu-box {
    box-sizing: border-box;
    transition: all 0.25s ease;
    width: 100%;

    .lew-context-menu-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 100%;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: var(--lew-text-color-1);
      box-sizing: border-box;
      border-radius: var(--lew-border-radius-small);
      height: 34px;
      .lew-context-menu-label {
        width: 100%;
        user-select: none;
        font-size: 14px;
        padding: 0px 12px;
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        cursor: pointer !important;
      }
    }

    .lew-context-menu-item-disabled {
      opacity: var(--lew-disabled-opacity);
      cursor: no-drop;
    }

    .lew-context-menu-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bg-active);
    }
  }
}
</style>
