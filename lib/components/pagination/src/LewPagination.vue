<script lang="ts" setup>
import { LewInput, LewSelect, LewFlex, LewButton } from 'lew-ui'
import { paginationProps } from './props'
import type { PaginationOptions } from './props'
import { object2class } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { locale } from 'lew-ui'
const props = defineProps(paginationProps)
const emit = defineEmits(['change', 'update:currentPage', 'update:pageSize'])

const total: Ref<number> = defineModel('total', { default: 0 })
const currentPage: Ref<number> = defineModel('currentPage', { default: 1 })
const pageSize: Ref<number> = defineModel('pageSize', { default: 10 })

const getPageSizeOptions = computed(() => {
  if (Array.isArray(props.pageSizeOptions)) {
    if (
      typeof props.pageSizeOptions[0] === 'string' ||
      typeof props.pageSizeOptions[0] === 'number'
    ) {
      return props.pageSizeOptions.map((item) => ({
        label: locale.t('pagination.pageSize', { pageSize: item }),
        value: item
      }))
    }
    return props.pageSizeOptions
  }
  return []
})

const state = reactive({
  toPage: undefined,
  pageSize: pageSize.value,
  visiblePagesCount: props.visiblePagesCount
})

onMounted(() => {
  // Ensure that the number of visible pages is at least 5 and at most 12.
  state.visiblePagesCount = Math.max(state.visiblePagesCount, 5)
  state.visiblePagesCount = Math.min(state.visiblePagesCount, 12)
})

const totalPages = computed(() => Math.ceil(total.value / state.pageSize))

const visiblePages = computed(() => {
  const _currentPage = currentPage.value
  const totalPages = Math.ceil(total.value / state.pageSize)

  let startPage = _currentPage - Math.floor(state.visiblePagesCount / 2)
  if (_currentPage < state.visiblePagesCount / 2 + 2) {
    startPage = 1
  }

  if (startPage < 1) {
    startPage = 1
  }
  let endPage = startPage + state.visiblePagesCount - 1
  if (endPage > totalPages) {
    endPage = totalPages
    startPage = endPage - state.visiblePagesCount + 1
    if (startPage < 1) {
      startPage = 1
    }
  }
  const visiblePages = []
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i)
  }
  return visiblePages
})

const changePage = (page: number) => {
  page = Math.floor(page)

  if (page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page
  pageSize.value = state.pageSize
  emit('change', {
    currentPage: currentPage.value,
    pageSize: state.pageSize
  })
}

// 是否显示省略号
const startEllipsis = computed(() => visiblePages.value[0] > 2 + 1)
const endEllipsis = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 2
)

// 是否显示最大和最小页码
const showOne = computed(() => visiblePages.value[0] > 1)
const showMax = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value
)

const checkPageSize = (value: any) => {
  state.pageSize = value
  changePage(currentPage.value)
}

const checkPageNum = (value: any) => {
  const page = Number(value)
  state.toPage = undefined
  if (page > totalPages.value || page < 1) {
    return
  }
  currentPage.value = page
  changePage(value)
}

const getPaginationClassName = computed(() => {
  const { size } = props
  return object2class('lew-pagination', {
    size
  })
})

const getIconSize = computed(() => {
  const { size } = props
  switch (size) {
    case 'small':
      return 16
    case 'medium':
      return 18
    case 'large':
      return 20
    default:
      return 18
  }
})
</script>

<template>
  <div class="lew-pagination" :class="getPaginationClassName">
    <lew-flex class="lew-pagination-control" gap="10">
      <slot name="left"></slot>
      <lew-flex class="lew-pagination-page-box" gap="5">
        <lew-button
          @click="changePage(currentPage - 1)"
          type="text"
          singleIcon
          :size="size"
        >
          <Icon type="chevron-left" :size="getIconSize" />
        </lew-button>
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
          <Icon :size="getIconSize" type="more-horizontal" />
        </div>
        <div
          v-else-if="
            currentPage > visiblePages.length / 2 + 2 &&
            visiblePagesCount < totalPages
          "
          class="lew-pagination-page-btn"
          @click="changePage(2)"
        >
          2
        </div>
        <div
          v-for="(page, index) in visiblePages"
          :key="index"
          class="lew-pagination-page-btn"
          :class="{
            active: Number(page) === Number(currentPage)
          }"
          @click="changePage(page)"
        >
          {{ page }}
        </div>
        <div
          v-if="endEllipsis"
          class="lew-pagination-page-btn"
          @click="changePage(visiblePages[visiblePages.length - 1] + 1)"
        >
          <Icon :size="getIconSize" type="more-horizontal" />
        </div>
        <div
          v-else-if="
            currentPage < totalPages - visiblePages.length / 2 - 1 &&
            visiblePagesCount < totalPages
          "
          class="lew-pagination-page-btn"
          @click="changePage(2)"
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
        <lew-button
          singleIcon
          type="text"
          :size="size"
          @click="changePage(currentPage + 1)"
        >
          <Icon type="chevron-right" :size="getIconSize" />
        </lew-button>
      </lew-flex>
      <lew-select
        v-model="state.pageSize"
        auto-width
        :popover-width="150"
        :size="size"
        :showCheckIcon="false"
        :options="getPageSizeOptions as PaginationOptions[]"
        @change="checkPageSize"
      />
      <lew-input
        v-model="state.toPage"
        :size="size"
        align="center"
        placeholder="跳转至"
        autoWidth
        @change="checkPageNum"
      />
      <slot name="right"></slot>
    </lew-flex>
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
    padding: 0px 4px;
    box-sizing: border-box;
    border-radius: var(--lew-border-radius-small);
    text-align: center;
    cursor: pointer;
  }

  .lew-pagination-page-btn:hover {
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
  }

  .lew-pagination-page-box {
    width: auto;
    position: relative;
    height: 100%;
    color: var(--lew-text-color-1);

    .active {
      background-color: var(--lew-color-primary);
      color: var(--lew-color-white-text);
    }

    .active:hover {
      background-color: var(--lew-color-primary);
      color: var(--lew-color-white-text);
    }
  }

  .lew-pagination-page-label {
    white-space: nowrap;
    padding: 0px 5px;
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
    padding: 0px 4px;
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
    padding: 0px 6px;
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
    padding: 0px 8px;
  }
}
</style>
