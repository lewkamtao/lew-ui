<script lang="ts" setup>
import type { LewSelectOption, LewTabsOption } from 'lew-ui/types'
import { LewInput } from 'lew-ui/components/form/input'
import { LewTabs } from 'lew-ui/components/form/tabs'
import { getLocale, locale } from 'lew-ui/locals'
import { formatIntegerLocale, object2class } from 'lew-ui/utils'
import { paginationEmits } from './emits'
import { paginationProps } from './props'

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const total = defineModel<number>('total', { default: 0 })
const currentPage = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })

const ELLIPSIS_START = '__ellipsis_start__'
const ELLIPSIS_END = '__ellipsis_end__'
const ELLIPSIS_LABEL = '···'

const toPage = ref<string | undefined>(undefined)

const normalizedVisiblePagesCount = computed(() =>
  Math.min(Math.max(props.visiblePagesCount, 5), 12),
)

const pageSizeOptions = computed((): LewSelectOption[] => {
  if (!Array.isArray(props.pageSizeOptions))
    return []

  const loc = currentLibLocale()
  const firstItem = props.pageSizeOptions[0]
  if (typeof firstItem === 'string' || typeof firstItem === 'number') {
    return (props.pageSizeOptions as (string | number)[]).map((item) => {
      const n = Number(item)
      const label = Number.isFinite(n)
        ? formatIntegerLocale(Math.trunc(n), loc)
        : String(item)
      return {
        label,
        value: item,
      }
    }) as LewSelectOption[]
  }
  return (props.pageSizeOptions as LewSelectOption[]).map(opt => ({
    label: opt.label,
    value: opt.value,
    disabled: opt.disabled,
  }))
})

const pageSizeTabOptions = computed((): LewTabsOption[] =>
  pageSizeOptions.value.map(opt => ({
    label: String(opt.label),
    value: String(opt.value),
    disabled: opt.disabled,
  })),
)

const pageSizeTabValue = computed({
  get: () => String(pageSize.value),
  set: (value: string) => {
    selectPageSize(value)
  },
})

const totalPages = computed(() => Math.ceil(total.value / pageSize.value) || 1)

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

function pageOption(page: number): LewTabsOption {
  return {
    label: formatPaginationInteger(page),
    value: String(page),
  }
}

const pageTabOptions = computed((): LewTabsOption[] => {
  const options: LewTabsOption[] = []
  const pages = visiblePages.value
  const pageSet = new Set(pages)

  if (showOne.value && !pageSet.has(1))
    options.push(pageOption(1))

  if (startEllipsis.value) {
    options.push({
      label: ELLIPSIS_LABEL,
      value: ELLIPSIS_START,
    })
  }
  else if (showSecondPage.value && !pageSet.has(2)) {
    options.push(pageOption(2))
  }

  for (const page of pages)
    options.push(pageOption(page))

  if (endEllipsis.value) {
    options.push({
      label: ELLIPSIS_LABEL,
      value: ELLIPSIS_END,
    })
  }
  else if (showSecondLastPage.value && !pageSet.has(totalPages.value - 1)) {
    options.push(pageOption(totalPages.value - 1))
  }

  if (showMax.value && !pageSet.has(totalPages.value))
    options.push(pageOption(totalPages.value))

  return options
})

const pageTabKey = computed(() =>
  pageTabOptions.value.map(opt => opt.value).join('|'),
)

const pageTabValue = computed(() => String(currentPage.value))

const getPaginationClassName = computed(() =>
  object2class('lew-pagination', { size: props.size }),
)

const slots = useSlots()

function currentLibLocale(): string {
  const g = (locale as unknown) as { locale?: { value: string } }
  return g.locale?.value ?? getLocale()
}

function formatPaginationInteger(n: number): string {
  return formatIntegerLocale(n, currentLibLocale())
}

const summaryText = computed(() => {
  if (!props.showSummary)
    return ''
  return locale.t('pagination.summary', {
    current: formatPaginationInteger(currentPage.value),
    totalPages: formatPaginationInteger(totalPages.value),
    total: formatPaginationInteger(total.value),
  })
})

const showMeta = computed(() => Boolean(!!slots.left || summaryText.value))
const showPageSize = computed(() => pageSizeTabOptions.value.length > 0)
const showEnd = computed(() => showPageSize.value || !!slots.right)

function changePage(page: number) {
  page = Math.floor(page)
  if (page < 1 || page > totalPages.value)
    return

  currentPage.value = page
  emit('change', { currentPage: page, pageSize: pageSize.value })
}

function onPageTabUpdate(value: string) {
  if (value === ELLIPSIS_START) {
    changePage(visiblePages.value[0] - 1)
    return
  }
  if (value === ELLIPSIS_END) {
    changePage(visiblePages.value[visiblePages.value.length - 1] + 1)
    return
  }

  const page = Number(value)
  if (!Number.isFinite(page))
    return
  changePage(page)
}

function selectPageSize(value: string | number) {
  const numValue = Number(value)
  if (!Number.isFinite(numValue) || numValue <= 0)
    return
  if (numValue === pageSize.value)
    return

  pageSize.value = numValue
  const newTotalPages = Math.ceil(total.value / numValue) || 1
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages
  }
  changePage(currentPage.value)
}

function parseJumpPageNumber(raw: string): number {
  const digits = String(raw).replace(/\D/g, '')
  if (digits === '')
    return Number.NaN
  return Number(digits)
}

function checkPageNum(value?: string) {
  if (value === undefined)
    return
  const page = parseJumpPageNumber(String(value))
  toPage.value = undefined
  if (page > totalPages.value || page < 1 || Number.isNaN(page))
    return

  currentPage.value = page
  changePage(page)
}
</script>

<template>
  <nav
    class="lew-pagination"
    :class="getPaginationClassName"
    :aria-label="locale.t('pagination.navLabel')"
  >
    <div class="lew-pagination-bar">
      <!-- 左侧：数量摘要 -->
      <div class="lew-pagination-side lew-pagination-side--start">
        <div
          v-if="showMeta"
          class="lew-pagination-group lew-pagination-group--meta"
        >
          <slot name="left" />
          <span
            v-if="summaryText"
            class="lew-pagination-summary"
            aria-live="polite"
          >{{ summaryText }}</span>
        </div>
      </div>

      <!-- 中间：页码切换 + 跳转 -->
      <div class="lew-pagination-side lew-pagination-side--center">
        <div class="lew-pagination-center-cluster">
          <LewTabs
            :key="pageTabKey"
            class="lew-pagination-page-tabs"
            :model-value="pageTabValue"
            :options="pageTabOptions"
            :size="size"
            width="auto"
            @update:model-value="onPageTabUpdate"
          />

          <div
            class="lew-pagination-control lew-pagination-control--jump"
            role="group"
            :aria-label="locale.t('pagination.jumpGroup')"
          >
            <LewInput
              v-model="toPage"
              :size="size"
              align="center"
              :placeholder="locale.t('pagination.jumpTo')"
              auto-width
              @change="checkPageNum"
            />
          </div>
        </div>
      </div>

      <!-- 右侧：每页条数分段切换 -->
      <div class="lew-pagination-side lew-pagination-side--end">
        <div
          v-if="showEnd"
          class="lew-pagination-group lew-pagination-group--controls"
        >
          <LewTabs
            v-if="showPageSize"
            v-model="pageSizeTabValue"
            class="lew-pagination-size-tabs"
            :options="pageSizeTabOptions"
            :size="size"
            width="auto"
          />
          <div
            v-if="$slots.right"
            class="lew-pagination-control lew-pagination-control--end"
          >
            <slot name="right" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.lew-pagination {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-height: 40px;
  user-select: none;
  font-size: 14px;
  vertical-align: middle;

  .lew-pagination-bar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    column-gap: 16px;
    width: 100%;
    min-height: 100%;
  }

  .lew-pagination-side {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .lew-pagination-side--start {
    justify-content: flex-start;
  }

  .lew-pagination-side--center {
    justify-content: center;
  }

  .lew-pagination-side--end {
    justify-content: flex-end;
  }

  .lew-pagination-center-cluster {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .lew-pagination-group {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .lew-pagination-group--meta {
    gap: 10px;
    font-size: var(--lew-form-font-size-medium);
  }

  .lew-pagination-page-tabs,
  .lew-pagination-size-tabs {
    flex: 0 0 auto;
    max-width: 100%;
  }

  .lew-pagination-summary {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: inherit;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.01em;
    line-height: 1.4;
    color: var(--lew-text-color-2);
    white-space: nowrap;
  }

  .lew-pagination-group--controls {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .lew-pagination-control {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex: 0 0 auto;
  }

  .lew-pagination-control--jump {
    :deep(.lew-input-view) {
      min-width: 3.5rem;
    }
  }

  .lew-pagination-page-tabs,
  .lew-pagination-size-tabs {
    :deep(.lew-tabs-item) {
      font-variant-numeric: tabular-nums;
    }
  }

  @media (max-width: 720px) {
    .lew-pagination-bar {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      row-gap: 12px;
      justify-items: stretch;
    }

    .lew-pagination-side--start,
    .lew-pagination-side--center,
    .lew-pagination-side--end {
      justify-content: center;
      width: 100%;
    }

    .lew-pagination-side--start {
      order: 1;
      justify-content: flex-start;
    }

    .lew-pagination-side--center {
      order: 2;
    }

    .lew-pagination-side--end {
      order: 3;
      justify-content: flex-end;
    }

    .lew-pagination-center-cluster {
      flex-wrap: wrap;
      justify-content: center;
    }

    .lew-pagination-summary {
      max-width: 100%;
    }

    .lew-pagination-group--controls {
      width: 100%;
      justify-content: space-between;
    }
  }
}

.lew-pagination-size-small {
  min-height: 36px;

  .lew-pagination-group--meta {
    font-size: var(--lew-form-font-size-small);
  }
}

.lew-pagination-size-medium {
  .lew-pagination-group--meta {
    font-size: var(--lew-form-font-size-medium);
  }
}

.lew-pagination-size-large {
  min-height: 44px;

  .lew-pagination-group--meta {
    font-size: var(--lew-form-font-size-large);
  }
}
</style>
