<script lang="ts" setup>
import type { LewSelectOption } from 'lew-ui/types'
import { getLocale, LewButton, LewInput, LewSelect, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { formatIntegerLocale, object2class } from 'lew-ui/utils'
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

const pageSizeSelectOptions = computed((): LewSelectOption[] => {
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

const pageSizeSelectWidth = computed(() => {
  const map: Record<string, string> = {
    small: '70px',
    medium: '80px',
    large: '90px',
  }
  return map[props.size] || '100px'
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

const canGoPrev = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

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

function onPageKeydown(e: KeyboardEvent, page: number) {
  if (e.key !== 'Enter' && e.key !== ' ')
    return
  e.preventDefault()
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
      <div
        v-if="$slots.left || summaryText"
        class="lew-pagination-group lew-pagination-group--meta"
      >
        <slot name="left" />
        <span v-if="summaryText" class="lew-pagination-summary" aria-live="polite">{{
          summaryText
        }}</span>
      </div>
      <div
        class="lew-pagination-group lew-pagination-group--pager lew-pagination-page-box"
      >
        <LewButton
          v-if="showPrevNextButtons"
          type="text"
          single-icon
          :size="size"
          :disabled="!canGoPrev"
          :title="locale.t('pagination.prevPage')"
          :aria-label="locale.t('pagination.prevPage')"
          @click="changePage(currentPage - 1)"
        >
          <CommonIcon type="chevron-left" :size="getIconSize" />
        </LewButton>
        <div
          v-if="showOne"
          role="button"
          tabindex="0"
          class="lew-pagination-page-btn"
          :aria-label="formatPaginationInteger(1)"
          @click="changePage(1)"
          @keydown="onPageKeydown($event, 1)"
        >
          {{ formatPaginationInteger(1) }}
        </div>
        <div
          v-if="startEllipsis"
          role="button"
          tabindex="0"
          class="lew-pagination-page-btn"
          :title="locale.t('pagination.prevSection')"
          :aria-label="locale.t('pagination.prevSection')"
          @click="changePage(visiblePages[0] - 1)"
          @keydown="onPageKeydown($event, visiblePages[0] - 1)"
        >
          <CommonIcon :size="getIconSize" type="more-horizontal" />
        </div>
        <div
          v-else-if="showSecondPage"
          role="button"
          tabindex="0"
          class="lew-pagination-page-btn"
          :aria-label="formatPaginationInteger(2)"
          @click="changePage(2)"
          @keydown="onPageKeydown($event, 2)"
        >
          {{ formatPaginationInteger(2) }}
        </div>
        <div
          v-for="(page, index) in visiblePages"
          :key="index"
          role="button"
          tabindex="0"
          class="lew-pagination-page-btn"
          :class="{ active: page === currentPage }"
          :aria-label="formatPaginationInteger(page)"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="changePage(page)"
          @keydown="onPageKeydown($event, page)"
        >
          {{ formatPaginationInteger(page) }}
        </div>
        <div
          v-if="endEllipsis"
          role="button"
          tabindex="0"
          class="lew-pagination-page-btn"
          :title="locale.t('pagination.nextSection')"
          :aria-label="locale.t('pagination.nextSection')"
          @click="changePage(visiblePages[visiblePages.length - 1] + 1)"
          @keydown="onPageKeydown($event, visiblePages[visiblePages.length - 1] + 1)"
        >
          <CommonIcon :size="getIconSize" type="more-horizontal" />
        </div>
        <div
          v-else-if="showSecondLastPage"
          role="button"
          tabindex="0"
          class="lew-pagination-page-btn"
          :aria-label="formatPaginationInteger(totalPages - 1)"
          @click="changePage(totalPages - 1)"
          @keydown="onPageKeydown($event, totalPages - 1)"
        >
          {{ formatPaginationInteger(totalPages - 1) }}
        </div>
        <div
          v-if="showMax"
          role="button"
          tabindex="0"
          class="lew-pagination-page-btn"
          :aria-label="formatPaginationInteger(totalPages)"
          @click="changePage(totalPages)"
          @keydown="onPageKeydown($event, totalPages)"
        >
          {{ formatPaginationInteger(totalPages) }}
        </div>
        <LewButton
          v-if="showPrevNextButtons"
          single-icon
          type="text"
          :size="size"
          :disabled="!canGoNext"
          :title="locale.t('pagination.nextPage')"
          :aria-label="locale.t('pagination.nextPage')"
          @click="changePage(currentPage + 1)"
        >
          <CommonIcon type="chevron-right" :size="getIconSize" />
        </LewButton>
      </div>
      <div
        v-if="pageSizeSelectOptions.length"
        class="lew-pagination-group lew-pagination-group--size"
      >
        <span class="lew-pagination-per-page-label">{{
          locale.t("pagination.perPage")
        }}</span>
        <LewSelect
          v-model="pageSize"
          class="lew-pagination-page-size-select"
          :width="pageSizeSelectWidth"
          :popover-width="pageSizeSelectWidth"
          :size="size"
          :show-check-icon="false"
          :options="pageSizeSelectOptions"
          @change="checkPageSize"
        />
      </div>
      <div
        class="lew-pagination-group lew-pagination-group--jump"
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
      <div v-if="$slots.right" class="lew-pagination-group lew-pagination-group--end">
        <slot name="right" />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.lew-pagination {
  display: inline-flex;
  box-sizing: border-box;
  max-width: 100%;
  min-height: 40px;
  border-radius: var(--lew-border-radius-small);
  user-select: none;
  font-size: 14px;
  vertical-align: middle;

  .lew-pagination-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 10px 14px;
    min-height: 100%;
    max-width: 100%;
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
  }

  .lew-pagination-group--pager {
    gap: 5px;
    flex: 0 1 auto;
    min-width: 0;
  }

  .lew-pagination-page-box {
    position: relative;
    height: 100%;
  }

  .lew-pagination-summary {
    flex: 0 1 auto;
    min-width: 0;
    max-width: min(100%, 22rem);
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.92em;
    line-height: 1.35;
    color: var(--lew-text-color-2);
    white-space: nowrap;
  }

  .lew-pagination-per-page-label {
    flex-shrink: 0;
    font-size: 0.92em;
    color: var(--lew-text-color-2);
    white-space: nowrap;
  }

  .lew-pagination-group--size {
    flex: 0 0 auto;
    align-items: center;

    .lew-pagination-page-size-select {
      flex: 0 0 auto;
    }
  }

  .lew-pagination-group--jump {
    flex: 0 0 auto;

    :deep(.lew-input-view) {
      min-width: 4.25rem;
    }
  }

  .lew-pagination-group--end {
    flex: 0 1 auto;
    min-width: 0;
  }

  @media (max-width: 640px) {
    .lew-pagination-bar {
      flex-wrap: wrap;
      row-gap: 10px;
      column-gap: 12px;
      justify-content: flex-start;
    }

    .lew-pagination-group--pager {
      flex: 1 1 auto;
      justify-content: center;
    }

    .lew-pagination-group--meta {
      flex: 1 1 100%;
      justify-content: flex-start;
    }

    .lew-pagination-summary {
      max-width: 100%;
    }
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

  .lew-pagination-page-btn:focus-visible {
    outline: 2px solid var(--lew-color-primary);
    outline-offset: 2px;
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
