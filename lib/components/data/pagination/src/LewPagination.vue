<script lang="ts" setup>
import type { LewSelectOption } from 'lew-ui/types'
import { LewButton, LewFlex, LewInput, LewSelect, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'
import { paginationEmits } from './emits'
import { paginationProps } from './props'

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const total = defineModel<number>('total', { default: 0 })
const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })

const toPage = ref<string | undefined>(undefined)

const ICON_SIZE_MAP: Record<string, number> = {
  small: 16,
  medium: 18,
  large: 20,
}

const normalizedVisiblePagesCount = computed(() =>
  Math.min(Math.max(props.visiblePagesCount, 5), 12),
)

const getPageSizeOptions = computed(() => {
  if (!Array.isArray(props.pageSizeOptions))
    return [] as LewSelectOption[]

  const firstItem = props.pageSizeOptions[0]
  if (typeof firstItem === 'string' || typeof firstItem === 'number') {
    return (props.pageSizeOptions as (string | number)[]).map(item => ({
      label: locale.t('pagination.pageSize', { pageSize: item }),
      value: item,
    })) as unknown as LewSelectOption[]
  }
  return props.pageSizeOptions as LewSelectOption[]
})

const getIconSize = computed(() => ICON_SIZE_MAP[props.size] || 18)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value) || 1)

const showPrevNextButtons = computed(() => totalPages.value > 1)

const visiblePages = computed(() => {
  const _currentPage = currentPage.value
  const _totalPages = totalPages.value
  const _visibleCount = normalizedVisiblePagesCount.value

  let startPage = _currentPage - Math.floor(_visibleCount / 2)
  if (_currentPage < _visibleCount / 2 + 2) {
    startPage = 1
  }
  if (startPage < 1) {
    startPage = 1
  }

  let endPage = startPage + _visibleCount - 1
  if (endPage > _totalPages) {
    endPage = _totalPages
    startPage = Math.max(endPage - _visibleCount + 1, 1)
  }

  const pages: number[] = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

const startEllipsis = computed(() => visiblePages.value[0] > 3)
const endEllipsis = computed(() => {
  const lastVisible = visiblePages.value[visiblePages.value.length - 1]
  return lastVisible < totalPages.value - 2
})

const showOne = computed(() => visiblePages.value[0] > 1)
const showMax = computed(() => {
  const lastVisible = visiblePages.value[visiblePages.value.length - 1]
  return lastVisible < totalPages.value
})

const showSecondPage = computed(() => {
  const _visibleCount = normalizedVisiblePagesCount.value
  return (
    currentPage.value > visiblePages.value.length / 2 + 2
    && _visibleCount < totalPages.value
  )
})

const showSecondLastPage = computed(() => {
  const _visibleCount = normalizedVisiblePagesCount.value
  return (
    currentPage.value < totalPages.value - visiblePages.value.length / 2 - 1
    && _visibleCount < totalPages.value
  )
})

const getPaginationClassName = computed(() =>
  object2class('lew-pagination', { size: props.size }),
)

function changePage(page: number) {
  page = Math.floor(page)
  if (page < 1 || page > totalPages.value)
    return

  currentPage.value = page
  emit('change', { currentPage: page, pageSize: pageSize.value })
}

function checkPageSize(value?: string | number | (string | number)[]) {
  if (value === undefined || Array.isArray(value))
    return
  const numValue = Number(value)
  pageSize.value = numValue
  const newTotalPages = Math.ceil(total.value / numValue) || 1
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages
  }
  changePage(currentPage.value)
}

function checkPageNum(value?: string) {
  if (value === undefined)
    return
  const page = Number(value)
  toPage.value = undefined
  if (page > totalPages.value || page < 1 || Number.isNaN(page))
    return

  currentPage.value = page
  changePage(page)
}
</script>

<template>
  <div class="lew-pagination" :class="getPaginationClassName">
    <LewFlex class="lew-pagination-control" gap="10">
      <slot name="left" />
      <LewFlex class="lew-pagination-page-box" gap="5px">
        <LewButton
          v-if="showPrevNextButtons"
          type="text"
          single-icon
          :size="size"
          @click="changePage(currentPage - 1)"
        >
          <CommonIcon type="chevron-left" :size="getIconSize" />
        </LewButton>
        <div
          v-if="showOne"
          class="lew-pagination-page-btn"
          @click="changePage(1)"
        >
          1
        </div>
        <div
          v-if="startEllipsis"
          class="lew-pagination-page-btn"
          @click="changePage(visiblePages[0] - 1)"
        >
          <CommonIcon :size="getIconSize" type="more-horizontal" />
        </div>
        <div
          v-else-if="showSecondPage"
          class="lew-pagination-page-btn"
          @click="changePage(2)"
        >
          2
        </div>
        <div
          v-for="(page, index) in visiblePages"
          :key="index"
          class="lew-pagination-page-btn"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
        >
          {{ page }}
        </div>
        <div
          v-if="endEllipsis"
          class="lew-pagination-page-btn"
          @click="changePage(visiblePages[visiblePages.length - 1] + 1)"
        >
          <CommonIcon :size="getIconSize" type="more-horizontal" />
        </div>
        <div
          v-else-if="showSecondLastPage"
          class="lew-pagination-page-btn"
          @click="changePage(totalPages - 1)"
        >
          {{ totalPages - 1 }}
        </div>
        <div
          v-if="showMax"
          class="lew-pagination-page-btn"
          @click="changePage(totalPages)"
        >
          {{ totalPages }}
        </div>
        <LewButton
          v-if="showPrevNextButtons"
          single-icon
          type="text"
          :size="size"
          @click="changePage(currentPage + 1)"
        >
          <CommonIcon type="chevron-right" :size="getIconSize" />
        </LewButton>
      </LewFlex>
      <LewSelect
        v-model="pageSize"
        auto-width
        popover-width="150px"
        :size="size"
        :show-check-icon="false"
        :options="getPageSizeOptions"
        @change="checkPageSize"
      />
      <LewInput
        v-model="toPage"
        :size="size"
        align="center"
        :placeholder="locale.t('pagination.jumpTo')"
        auto-width
        @change="checkPageNum"
      />
      <slot name="right" />
    </LewFlex>
  </div>
</template>

<style lang="scss" scoped>
.lew-pagination {
  display: inline-block;
  box-sizing: border-box;
  height: 40px;
  border-radius: var(--lew-border-radius-small);
  user-select: none;
  font-size: 14px;

  .lew-pagination-control {
    height: 100%;
  }

  .lew-pagination-page-btn {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    padding: 0 4px;
    box-sizing: border-box;
    border-radius: var(--lew-border-radius-small);
    text-align: center;
    cursor: pointer;
    background: transparent;
    color: var(--lew-text-color-1);
    transition:
      background-color var(--lew-form-transition-ease),
      color var(--lew-form-transition-ease),
      transform var(--lew-form-transition-bezier);
  }

  .lew-pagination-page-btn:hover:not(.active) {
    background-color: var(--lew-color-pagination-primary-hover-bg);
    color: var(--lew-color-pagination-primary-hover-text);
  }

  .lew-pagination-page-btn:active:not(.active) {
    transform: scale(0.9);
  }

  .lew-pagination-page-btn.active {
    background-color: var(--lew-color-pagination-primary-active-bg);
    color: var(--lew-color-pagination-primary-active-text);
  }

  .lew-pagination-page-btn.active:hover {
    background-color: var(--lew-color-pagination-primary-active-bg-hover);
    color: var(--lew-color-pagination-primary-active-text-hover);
  }

  .lew-pagination-page-btn.active:active {
    background-color: var(--lew-color-pagination-primary-active-bg-active);
    color: var(--lew-color-pagination-primary-active-text-active);
  }

  .lew-pagination-page-box {
    width: auto;
    position: relative;
    height: 100%;
  }

  .lew-pagination-page-label {
    white-space: nowrap;
    padding: 0 5px;
  }
}

.lew-pagination-size-small {
  .lew-pagination-page-box {
    :deep() {
      .lew-button {
        height: calc(var(--lew-form-item-height-small) - 6px);
        width: calc(var(--lew-form-item-height-small) - 6px);
      }
    }
  }

  .lew-pagination-page-btn {
    height: calc(var(--lew-form-item-height-small) - 6px);
    min-width: calc(var(--lew-form-item-height-small) - 6px);
    font-size: var(--lew-form-font-size-small);
    padding: 0 4px;
  }
}

.lew-pagination-size-medium {
  .lew-pagination-page-box {
    :deep() {
      .lew-button {
        height: calc(var(--lew-form-item-height-medium) - 8px);
        width: calc(var(--lew-form-item-height-medium) - 8px);
      }
    }
  }

  .lew-pagination-page-btn {
    height: calc(var(--lew-form-item-height-medium) - 8px);
    min-width: calc(var(--lew-form-item-height-medium) - 8px);
    font-size: var(--lew-form-font-size-medium);
    padding: 0 6px;
  }
}

.lew-pagination-size-large {
  .lew-pagination-page-box {
    :deep() {
      .lew-button {
        height: calc(var(--lew-form-item-height-large) - 10px);
        width: calc(var(--lew-form-item-height-large) - 10px);
      }
    }
  }

  .lew-pagination-page-btn {
    height: calc(var(--lew-form-item-height-large) - 10px);
    min-width: calc(var(--lew-form-item-height-large) - 10px);
    font-size: var(--lew-form-font-size-large);
    padding: 0 8px;
  }
}
</style>
