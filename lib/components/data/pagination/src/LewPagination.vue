<script lang="ts" setup>
// 1. 类型导入
import type { LewSelectOption } from "lew-ui/types";

// 2. 组件导入
import { LewButton, LewFlex, LewInput, LewSelect, locale } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";

// 3. 工具函数导入
import { object2class } from "lew-ui/utils";

// 4. 组件配置导入
import { paginationEmits } from "./emits";
import { paginationProps } from "./props";

// Props & Emits
const props = defineProps(paginationProps);
const emit = defineEmits(paginationEmits);

// v-model
const total: Ref<number> = defineModel("total", { default: 0 });
const currentPage: Ref<number> = defineModel("currentPage", { default: 1 });
const pageSize: Ref<number> = defineModel("pageSize", { default: 10 });

// 响应式状态
const state = reactive({
  toPage: undefined as string | undefined,
  visiblePagesCount: props.visiblePagesCount,
});

// 图标尺寸映射（用于 computed）
const iconSizeMap: Record<string, number> = {
  small: 16,
  medium: 18,
  large: 20,
};

// 计算属性
const getPageSizeOptions = computed(() => {
  if (Array.isArray(props.pageSizeOptions)) {
    if (
      typeof props.pageSizeOptions[0] === "string" ||
      typeof props.pageSizeOptions[0] === "number"
    ) {
      return props.pageSizeOptions.map((item) => ({
        label: locale.t("pagination.pageSize", { pageSize: item }),
        value: item,
      }));
    }
    return props.pageSizeOptions;
  }
  return [];
});

// 图标尺寸（使用映射对象优化，避免 switch）
const getIconSize = computed(() => iconSizeMap[props.size] || 18);

onMounted(() => {
  // Ensure that the number of visible pages is at least 5 and at most 12.
  state.visiblePagesCount = Math.max(state.visiblePagesCount, 5);
  state.visiblePagesCount = Math.min(state.visiblePagesCount, 12);
});

const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

const visiblePages = computed(() => {
  const _currentPage = currentPage.value;
  const _totalPages = Math.ceil(total.value / pageSize.value);
  const _visibleCount = state.visiblePagesCount;

  let startPage = _currentPage - Math.floor(_visibleCount / 2);
  if (_currentPage < _visibleCount / 2 + 2) {
    startPage = 1;
  }

  if (startPage < 1) {
    startPage = 1;
  }

  let endPage = startPage + _visibleCount - 1;
  if (endPage > _totalPages) {
    endPage = _totalPages;
    startPage = endPage - _visibleCount + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

function changePage(page: number) {
  page = Math.floor(page);

  if (page < 1 || page > totalPages.value) {
    return;
  }

  currentPage.value = page;
  emit(
    "change",
    toRaw({
      currentPage: page,
      pageSize: pageSize.value,
    })
  );
}

// 是否显示省略号
const startEllipsis = computed(() => visiblePages.value[0] > 3);
const endEllipsis = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 2
);

// 是否显示最大和最小页码
const showOne = computed(() => visiblePages.value[0] > 1);
const showMax = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value
);

// 是否显示第二页
const showSecondPage = computed(() => {
  return (
    currentPage.value > visiblePages.value.length / 2 + 2 &&
    state.visiblePagesCount < totalPages.value
  );
});

// 是否显示倒数第二页
const showSecondLastPage = computed(() => {
  return (
    currentPage.value < totalPages.value - visiblePages.value.length / 2 - 1 &&
    state.visiblePagesCount < totalPages.value
  );
});

function checkPageSize(value: any) {
  pageSize.value = value;
  // 切换 pageSize 后，需要重新计算当前页是否超出范围
  const newTotalPages = Math.ceil(total.value / value);
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages || 1;
  }
  changePage(currentPage.value);
}

function checkPageNum(value: any) {
  const page = Number(value);
  state.toPage = undefined;
  if (page > totalPages.value || page < 1 || Number.isNaN(page)) {
    return;
  }
  currentPage.value = page;
  changePage(page);
}

const getPaginationClassName = computed(() => {
  const { size } = props;
  return object2class("lew-pagination", {
    size,
  });
});
</script>

<template>
  <div class="lew-pagination" :class="getPaginationClassName">
    <LewFlex class="lew-pagination-control" gap="10">
      <slot name="left" />
      <LewFlex class="lew-pagination-page-box" gap="5px">
        <LewButton
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
          :class="{
            active: Number(page) === Number(currentPage),
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
        :options="getPageSizeOptions as LewSelectOption[]"
        @change="checkPageSize"
      />
      <LewInput
        v-model="state.toPage"
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
    padding: 0px 4px;
    box-sizing: border-box;
    border-radius: var(--lew-border-radius-small);
    text-align: center;
    cursor: pointer;
  }

  .lew-pagination-page-btn:hover {
    background-color: var(--lew-color-primary-light);
  }

  .lew-pagination-page-box {
    width: auto;
    position: relative;
    height: 100%;

    .active {
      background-color: var(--lew-color-primary);
      color: var(--lew-color-white);
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
