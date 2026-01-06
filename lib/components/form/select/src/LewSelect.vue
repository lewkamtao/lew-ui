<script setup lang="ts">
import type { LewSelectOption } from "lew-ui/types";
import { useDebounceFn } from "@vueuse/core";
import { LewCheckbox, LewEmpty, LewFlex, LewPopover, locale } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import CommonInput from "lew-ui/_components/CommonInput.vue";
import {
  any2px,
  filterSelectOptionsByKeyword,
  flattenSelectOptions,
  numFormat,
  object2class,
  parseDimension,
  poll,
} from "lew-ui/utils";
import { cloneDeep, isFunction } from "lodash-es";
import { VirtList } from "vue-virt-list";
import { selectEmits } from "./emits";
import { selectProps } from "./props";

const props = defineProps(selectProps);
const emit = defineEmits(selectEmits);
const selectValue: Ref<
  string | number | (string | number)[] | undefined
> = defineModel();

const lewSelectInputRef = ref();

const lewPopoverRef = ref();
const formMethods: any = inject("formMethods", {});
const virtListRef = ref();

const state = reactive({
  visible: false,
  loading: false,
  initLoading: true,
  sourceOptions: props.options,
  sourceFlattenOptions: flattenSelectOptions(props.options),
  options: flattenSelectOptions(props.options),
  hideBySelect: false,
  keyword: props.multiple
    ? ""
    : props.defaultValue || (selectValue.value as any),
  keywordBackup: props.multiple ? "" : (props.defaultValue as any),
  autoWidth: 0,
  searchCache: new Map<string, LewSelectOption[]>(),
  popoverWidth: 0,
});

const _searchMethod = computed(() => {
  if (isFunction(props.searchMethod)) {
    return props.searchMethod;
  } else if (props.searchMethodId) {
    return formMethods[props.searchMethodId];
  } else {
    return filterSelectOptionsByKeyword;
  }
});

const _initMethod = computed(() => {
  if (isFunction(props.initMethod)) {
    return props.initMethod;
  } else if (props.initMethodId) {
    return formMethods[props.initMethodId];
  }
  return false;
});

const shouldShowEmptyState = computed(() => {
  return state.options && state.options.length === 0;
});

const shouldShowResultCount = computed(() => {
  return props.searchable && !shouldShowEmptyState.value;
});

const inputPlaceholder = computed(() => {
  if (props.multiple) {
    return props.placeholder || locale.t("selectMultiple.placeholder");
  }
  if (state.keywordBackup || props.placeholder) {
    return props.placeholder;
  }
  return locale.t("select.placeholder");
});

// 多选模式的宽度更新函数
function updateWidths() {
  if (props.multiple && lewSelectInputRef.value) {
    const selectWidth = lewSelectInputRef.value.$el
      ? lewSelectInputRef.value.$el.clientWidth
      : 0;
    state.popoverWidth = selectWidth - 12;
  }
}

const getOptionText = computed(() => {
  return (templateProps: any) => {
    if (templateProps.isGroup) {
      return `${templateProps.label} (${templateProps.total})`;
    }
    return templateProps.label;
  };
});

async function init() {
  if (_initMethod.value) {
    const newOptions = await _initMethod.value();
    state.sourceOptions = newOptions;
    state.options = flattenSelectOptions(newOptions);
    state.sourceFlattenOptions = state.options;
    findKeyword();
  }
  if (props.enableSearchCache) {
    state.searchCache.set("", state.options);
  }
  state.initLoading = false;
}

watch(
  () => props.defaultValue,
  () => {
    state.keyword = props.defaultValue;
  }
);

watch(
  () => props.options,
  (newOptions) => {
    if (!_initMethod.value) {
      state.sourceOptions = newOptions;
      state.options = flattenSelectOptions(newOptions);
      state.keyword =
        newOptions?.find((e: any) => e.value === selectValue.value)?.label ||
        "";
      if (props.enableSearchCache) {
        state.searchCache.clear();
      }
    }
  },
  {
    deep: true,
  }
);

const computedWidth = computed(() => {
  if (props.autoWidth && state.autoWidth > 0) {
    return state.autoWidth;
  }
  return props.width;
});

// ResizeObserver for multiple mode
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (props.autoWidth && !props.multiple) {
    calculateAutoWidth();
  }
  init();

  // 设置 ResizeObserver 监听宽度变化（多选模式）
  if (props.multiple) {
    nextTick(() => {
      if (lewSelectInputRef.value && lewSelectInputRef.value.$el) {
        resizeObserver = new ResizeObserver(() => {
          updateWidths();
        });
        resizeObserver.observe(lewSelectInputRef.value.$el);
      }
    });
  }
});

onUnmounted(() => {
  // 清理 ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});

const SELECT_WIDTH_TOLERANCE = 40;

function calculateAutoWidth() {
  if (!props.autoWidth) return;

  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.whiteSpace = "nowrap";
  tempDiv.style.fontSize = getComputedStyle(document.body).fontSize;
  if (lewSelectInputRef.value) {
    const {
      fontSize,
      fontFamily,
      padding,
      marginLeft,
    } = lewSelectInputRef.value.getInputRefStyle();
    tempDiv.style.fontSize = fontSize;
    tempDiv.style.fontFamily = fontFamily;
    tempDiv.style.padding = padding;
    let textContent = state.keyword;
    if (!textContent || textContent.trim() === "") {
      textContent = props.placeholder || locale.t("select.placeholder");
    }
    tempDiv.textContent = textContent;
    document.body.appendChild(tempDiv);

    const textWidth = tempDiv.clientWidth;
    console.log(marginLeft);
    state.autoWidth =
      textWidth + SELECT_WIDTH_TOLERANCE + Number.parseInt(marginLeft);

    document.body.removeChild(tempDiv);
  }
}

watch(
  () => state.keyword,
  () => {
    if (props.autoWidth) {
      calculateAutoWidth();
    }
  }
);

function show() {
  lewPopoverRef.value.show();
}

function hide() {
  lewPopoverRef.value.hide();
}

const searchDebounce = useDebounceFn(async (e: any) => {
  search(e);
}, props.searchDelay);

async function search(e: any) {
  state.loading = true;
  const keyword = e.target.value;
  if (props.searchable) {
    let result: LewSelectOption[] = [];

    if (props.enableSearchCache && state.searchCache.has(keyword)) {
      result = state.searchCache.get(keyword)!;
    } else {
      const optionsToSearch = flattenSelectOptions(state.sourceOptions);
      if (!keyword && optionsToSearch.length > 0) {
        result = optionsToSearch;
      } else {
        result = await _searchMethod.value({
          options: optionsToSearch,
          keyword,
        });
      }
      if (props.enableSearchCache) {
        state.searchCache.set(keyword, result);
      }
    }

    state.options = result;
  }
  state.loading = false;
}

function clearHandle() {
  if (props.multiple) {
    selectValue.value = [] as (string | number)[];
    emit("clear");
    emit("change", selectValue.value);
    setTimeout(() => {
      lewPopoverRef.value && lewPopoverRef.value.refresh();
    }, 100);
  } else {
    selectValue.value = undefined;
    state.keywordBackup = undefined;
    emit("clear");
    emit("change", undefined);
  }
}

function selectHandle(item: LewSelectOption) {
  if (item.disabled || item.isGroup) {
    return;
  }

  if (props.multiple) {
    // 多选模式
    const currentValues = (selectValue.value as (string | number)[]) || [];
    const index = currentValues.findIndex(
      (v: string | number) => v === item.value
    );

    if (index >= 0) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(item.value);
    }

    selectValue.value = [...currentValues];
    emit("change", selectValue.value);
    updateWidths();
    setTimeout(() => {
      lewPopoverRef.value && lewPopoverRef.value.refresh();
    }, 100);
  } else {
    // 单选模式
    state.hideBySelect = true;
    state.keyword = item.label;
    selectValue.value = item.value;
    emit("change", item.value);
    setTimeout(() => {
      hide();
    }, 100);
  }
}

const getChecked = computed(() => (value: string | number) => {
  if (props.multiple) {
    const currentValues = (selectValue.value as (string | number)[]) || [];
    return currentValues.includes(value);
  }
  return selectValue.value === value;
});

// 多选模式删除标签
function deleteTag(value: string | number) {
  if (!props.multiple) return;

  const currentValues = (selectValue.value as (string | number)[]) || [];
  const valueIndex = currentValues.findIndex(
    (v: string | number) => v === value
  );

  if (valueIndex > -1) {
    const item = currentValues[valueIndex];
    currentValues.splice(valueIndex, 1);
    selectValue.value = [...currentValues];
    emit("delete", selectValue.value, item);
    emit("change", selectValue.value);
    setTimeout(() => {
      lewPopoverRef.value && lewPopoverRef.value.refresh();
    }, 100);
    updateWidths();
  }
}

// 多选模式格式化选中项
const formatItems = computed(() => {
  if (!props.multiple) return [];
  const currentValues = (selectValue.value as (string | number)[]) || [];
  return (state.sourceFlattenOptions || []).filter((e: any) => {
    return currentValues.includes(e.value);
  });
});

function findKeyword() {
  if (props.multiple) {
    // 多选模式不需要设置keyword
    return;
  }

  if (state.options) {
    const option = state.options.find((e: any) => {
      if (e) {
        return e.value === selectValue.value;
      }
      return false;
    });

    if (option && JSON.stringify(option) !== "{}") {
      return (state.keyword = option.label);
    }
  }
  return (state.keyword = props.defaultValue);
}
findKeyword();

const getBodyClassName = computed(() => {
  const { size, disabled } = props;
  return object2class("lew-select-body", { size, disabled });
});

const getVirtualHeight = computed(() => {
  let height = state.options.length * props.itemHeight;
  height = height >= 280 ? 280 : height;
  return height;
});

const VIRTUAL_LIST_THRESHOLD = 50;

const useVirtualList = computed(() => {
  return state.options.length > VIRTUAL_LIST_THRESHOLD;
});

async function showHandle() {
  state.visible = true;

  if (props.multiple) {
    updateWidths();
  } else {
    state.keywordBackup = cloneDeep(state.keyword);
    state.hideBySelect = false;
  }

  // 统一的搜索逻辑
  if (props.searchable) {
    if (props.multiple) {
      // 多选模式：清空搜索关键词以显示所有选项
      state.keyword = "";
    } else {
      // 单选模式：清空输入框以便搜索
      state.keyword = "";
    }
    await search({ target: { value: "" } });
  }

  // 统一的滚动逻辑
  let targetIndex = -1;
  if (props.multiple) {
    const currentValues = (selectValue.value as (string | number)[]) || [];
    const indexes = currentValues
      .map((value: any) =>
        state.options.findIndex((e: any) => e.value === value)
      )
      .filter((index: number) => index > -1);
    targetIndex = indexes.length > 0 ? Math.min(...indexes) : -1;
  } else {
    targetIndex = state.options.findIndex(
      (e: any) => e.value === selectValue.value
    );
  }

  if (useVirtualList.value) {
    poll({
      callback: () => {
        if (targetIndex > 0 && targetIndex !== Infinity) {
          virtListRef.value.scrollToIndex(targetIndex);
        } else {
          virtListRef.value.reset();
        }
      },
      vail: () => {
        return !!virtListRef.value;
      },
    });
  }

  emit("focus");
}

function hideHandle() {
  state.visible = false;
  if (!state.hideBySelect) {
    findKeyword();
  }
  emit("blur");
}

const isShowScrollBar = computed(() => {
  return getVirtualHeight.value >= 280;
});

const getPopoverBodyWidth = computed(() => {
  const { popoverWidth } = props;
  if (!lewSelectInputRef.value) return popoverWidth;
  return popoverWidth && popoverWidth !== "100%"
    ? parseDimension(popoverWidth) - 14
    : lewSelectInputRef.value.$el.offsetWidth - 14;
});

watch(
  () => selectValue.value,
  () => {
    findKeyword();
    if (props.autoWidth) {
      calculateAutoWidth();
    }
    if (props.multiple) {
      updateWidths();
    }
  },
  {
    deep: true,
  }
);

const getResultText = computed(() => {
  const localeKey = props.multiple
    ? "selectMultiple.resultCount"
    : "select.resultCount";
  return state.options.length > 0
    ? locale.t(localeKey, {
        num: numFormat(state.options.filter((e: any) => !e.isGroup).length),
      })
    : "";
});

// 添加多选模式需要的计算属性

const getSelectItemClassName = computed(() => (e: any) => {
  const { disabled, isGroup } = e;
  const active = getChecked.value(e.value);

  return object2class("lew-select-item", {
    disabled,
    active,
    "is-group": isGroup,
    mul: props.multiple,
  });
});

const shouldShowCheckIcon = computed(() => (value: any) => {
  return !props.multiple && getChecked.value(value) && props.showCheckIcon;
});

defineExpose({
  show,
  hide,
  clearSearchCache: () => {
    if (props.enableSearchCache) {
      state.searchCache.clear();
    }
  },
});
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    popover-body-class-name="lew-select-popover-body"
    class="lew-select-view"
    :style="{ width: autoWidth ? 'auto' : any2px(width) }"
    :trigger="trigger"
    :trigger-width="any2px(computedWidth)"
    :hide-on-click="searchable ? false : true"
    :disabled="disabled || readonly || state.initLoading"
    placement="bottom-start"
    :loading="state.loading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <CommonInput
        ref="lewSelectInputRef"
        v-model="selectValue"
        v-model:keyword="state.keyword"
        :loading="state.initLoading"
        :clearable="clearable"
        :readonly="readonly"
        :disabled="disabled || state.initLoading"
        :size="size"
        :placeholder="inputPlaceholder"
        :width="any2px(computedWidth)"
        :focus="state.visible"
        :format-items="formatItems"
        :multiple="multiple"
        :searchable="searchable"
        :selected-label="state.keyword"
        @clear="clearHandle"
        @delete="deleteTag"
        @input="searchDebounce"
      />
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="{
          width: multiple
            ? any2px(state.popoverWidth)
            : any2px(getPopoverBodyWidth),
        }"
      >
        <slot name="header" />

        <div class="lew-select-options-box">
          <template v-if="shouldShowEmptyState">
            <slot v-if="$slots.empty" name="empty" />
            <LewFlex v-else direction="y" x="center" class="lew-not-found">
              <LewEmpty :title="locale.t('select.noResult')" />
            </LewFlex>
          </template>
          <template v-else>
            <div v-if="shouldShowResultCount" class="lew-result-count">
              {{ getResultText }}
            </div>
            <VirtList
              v-if="useVirtualList"
              ref="virtListRef"
              :list="state.options"
              :min-size="itemHeight"
              :buffer="5"
              item-key="value"
              class="lew-select-options-list lew-scrollbar"
              :style="{
                height: `${getVirtualHeight}px`,
                paddingRight: isShowScrollBar ? '5px' : '0px',
              }"
            >
              <template #default="{ itemData: templateProps }">
                <slot
                  v-if="$slots.item"
                  name="item"
                  :props="{
                    ...templateProps,
                    checked: getChecked(templateProps.value),
                  }"
                  @click="selectHandle(templateProps)"
                />
                <div
                  v-else
                  class="lew-select-item"
                  :class="getSelectItemClassName(templateProps)"
                  :style="{ height: `${itemHeight}px` }"
                  @click="selectHandle(templateProps)"
                >
                  <LewCheckbox
                    v-if="multiple && !templateProps.isGroup"
                    :key="templateProps.value"
                    class="lew-select-checkbox"
                    :checked="getChecked(templateProps.value)"
                  />
                  <div
                    class="lew-select-label"
                    :class="{ 'is-group': templateProps.isGroup }"
                    :title="getOptionText(templateProps)"
                  >
                    {{ getOptionText(templateProps) }}
                  </div>
                  <CommonIcon
                    v-if="shouldShowCheckIcon(templateProps.value)"
                    class="lew-icon-check"
                    :size="16"
                    :stroke-width="3"
                    type="check"
                  />
                </div>
              </template>
            </VirtList>
            <div
              v-else
              class="lew-select-options-list lew-scrollbar"
              :style="{
                maxHeight: '280px',
                paddingRight: isShowScrollBar ? '5px' : '0px',
              }"
            >
              <template v-for="item in state.options" :key="item.value">
                <slot
                  v-if="$slots.item"
                  name="item"
                  :props="{
                    ...item,
                    checked: getChecked(item.value),
                  }"
                  @click="selectHandle(item)"
                />
                <div
                  v-else
                  class="lew-select-item"
                  :class="getSelectItemClassName(item)"
                  :style="{ height: `${itemHeight}px` }"
                  @click="selectHandle(item)"
                >
                  <LewCheckbox
                    v-if="multiple && !item.isGroup"
                    :key="item.value"
                    class="lew-select-checkbox"
                    :checked="getChecked(item.value)"
                  />
                  <div
                    class="lew-select-label"
                    :class="{ 'is-group': item.isGroup }"
                    :title="getOptionText(item)"
                  >
                    {{ getOptionText(item) }}
                  </div>
                  <CommonIcon
                    v-if="shouldShowCheckIcon(item.value)"
                    class="lew-icon-check"
                    :size="16"
                    :stroke-width="3"
                    type="check"
                  />
                </div>
              </template>
            </div>
          </template>
        </div>
        <slot name="footer" />
      </div>
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-select-view {
  width: 100%;

  > div {
    width: 100%;
  }
}
</style>

<style lang="scss">
.lew-select-popover-body {
  padding: 6px;
}

.lew-select-multiple-popover {
  &-body {
    padding: 6px;
  }
}

.lew-select-body {
  width: 100%;
  box-sizing: border-box;

  .lew-select-options-list {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .lew-result-count {
    padding: 5px 12px;
    font-size: 13px;
    opacity: 0.7;
  }

  .lew-select-options-box {
    height: auto;
    box-sizing: border-box;
    margin-top: -4px;
    margin-bottom: -4px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.25s ease;

    .lew-select-item {
      position: relative;
      display: inline-flex;
      width: 100%;
      height: 34px;
      align-items: center;
      box-sizing: border-box;
      border-radius: calc(var(--lew-border-radius-small) - 1px);
      color: var(--lew-text-color-1);
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;

      // 多选模式样式
      &.lew-select-item-mul {
        .lew-select-checkbox {
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 12px;
        }

        .lew-select-label {
          position: relative;
          z-index: 5;
          height: 30px;
          line-height: 30px;
          padding-left: 38px;
          box-sizing: border-box;
          cursor: pointer !important;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &.is-group {
            padding-left: 12px;
            color: var(--lew-text-color-6);
            font-size: 12px;
            pointer-events: none;
            padding-top: 4px;
          }
        }
      }
    }

    .lew-select-item-disabled {
      opacity: var(--lew-disabled-opacity);
      cursor: no-drop;
    }

    .lew-select-label {
      width: 100%;
      height: 30px;
      padding: 0px 12px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 30px;
      user-select: none;
      cursor: pointer !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .lew-select-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bgcolor-hover);

      // 多选模式下，hover item 时 checkbox 也显示 hover 效果
      .lew-select-checkbox {
        .lew-checkbox-icon-box {
          border: var(--lew-form-border-width)
            var(--lew-checkbox-icon-border-hover) solid;
          background: var(--lew-checkbox-icon-bg-hover);
        }

        // checked 状态的 hover 效果
        &.lew-checkbox-checked {
          .lew-checkbox-icon-box {
            border: var(--lew-form-border-width)
              var(--lew-checkbox-checked-icon-border-hover) solid;
            background: var(--lew-checkbox-checked-icon-bg-hover);
          }
        }
      }
    }

    .lew-select-slot-item {
      width: 100%;
      border-radius: calc(var(--lew-border-radius-small) - 1px);
    }

    .lew-select-slot-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bgcolor-hover);
    }

    .lew-select-item-active {
      color: var(--lew-checkbox-color);
      background-color: var(--lew-pop-bgcolor-hover);

      .lew-icon-check {
        margin-right: 10px;
      }
    }

    .lew-select-item-active:hover {
      color: var(--lew-checkbox-color);
      background-color: var(--lew-pop-bgcolor-hover);

      // 多选模式下，hover active item 时 checkbox 也显示 hover 效果
      .lew-select-checkbox {
        .lew-checkbox-icon-box {
          border: var(--lew-form-border-width)
            var(--lew-checkbox-checked-icon-border-hover) solid;
          background: var(--lew-checkbox-checked-icon-bg-hover);
        }
      }
    }

    .lew-select-item-is-group {
      color: var(--lew-text-color-6);
      background-color: var(--lew-pop-bgcolor);
      cursor: default;
      box-sizing: border-box;
      cursor: no-drop;
      pointer-events: none;

      .lew-select-label {
        font-size: 12px;
        box-sizing: border-box;
        padding-top: 4px;
      }
    }
  }
}
</style>
