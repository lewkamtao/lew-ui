<script setup lang="ts">
import type { LewBreadcrumbOption } from 'lew-ui/types'
import { breadcrumbEmits } from './emits'
import { breadcrumbProps } from './props'

const props = defineProps(breadcrumbProps)
const emit = defineEmits(breadcrumbEmits)

function handleItemClick(item: LewBreadcrumbOption, index: number): void {
  if (item.value !== undefined) {
    emit('change', item, index)
  }
}
</script>

<template>
  <div class="lew-breadcrumb">
    <div
      v-for="(item, index) in props.options" :key="`breadcrumb-${index}-${item.label}`" class="lew-breadcrumb-item"
      :class="{ 'lew-breadcrumb-active': item.active }"
    >
      <span
        class="lew-breadcrumb-item-label" :class="{ 'lew-breadcrumb-isPath': !!item.value }"
        @click="handleItemClick(item, index)"
      >
        {{ item.label }}
      </span>
      <div v-if="index !== (props.options?.length || 0) - 1" class="lew-breadcrumb-parting">
        <svg
          v-if="props.separator === 'sprit'" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"
        >
          <path d="M29.506 6.502 18.493 41.498" />
        </svg>

        <svg
          v-if="props.separator === 'shoulder'" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"
        >
          <path d="m16 39.513 15.556-15.557L16 8.4" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-breadcrumb {
  display: inline-flex;
  align-items: center;
  font-size: 14px;

  .lew-breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-weight: 400;
    color: var(--lew-text-color-5);
    user-select: none;
    white-space: nowrap;
    transition: color 0.2s ease;

    .lew-breadcrumb-item-label {
      cursor: default;
      padding: 2px 4px;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .lew-breadcrumb-isPath {
      cursor: pointer;

      &:hover {
        background-color: var(--lew-bgcolor-2);
        color: var(--lew-text-color-3);
      }

      &:active {
        background-color: var(--lew-bgcolor-3);
        transform: translateY(1px);
      }
    }

    &.lew-breadcrumb-active {
      color: var(--lew-text-color-1);
      font-weight: 500;

      span {
        color: inherit;
      }
    }
  }

  .lew-breadcrumb-parting {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;

    svg {
      margin: 0 2px;
      height: 1em;
      width: auto;
      color: var(--lew-text-color-5);
      opacity: var(--lew-disabled-opacity);
      transition: opacity 0.2s ease;
    }
  }
}

@media (max-width: 768px) {
  .lew-breadcrumb {
    font-size: 13px;

    .lew-breadcrumb-item span {
      padding: 1px 3px;
    }

    .lew-breadcrumb-parting svg {
      margin: 0 3px;
    }
  }
}
</style>
