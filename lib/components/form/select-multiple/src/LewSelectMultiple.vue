<script setup lang="ts">
import type { LewSelectMultipleOption } from "lew-ui";
import { useDebounceFn } from "@vueuse/core";
import {
  LewCheckbox,
  LewEmpty,
  LewFlex,
  LewPopover,
  LewTag,
  LewTextTrim,
  locale,
} from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import {
  any2px,
  filterSelectOptionsByKeyword,
  flattenSelectOptions,
  numFormat,
  object2class,
  poll,
} from "lew-ui/utils";
import { cloneDeep, isFunction } from "lodash-es";
import { useSlots } from "vue";
import { VirtList } from "vue-virt-list";
import { selectMultipleEmits } from "./emits";
import { selectMultipleProps } from "./props";

const props = defineProps(selectMultipleProps);
const emit = defineEmits(selectMultipleEmits);
const selectValue: any = defineModel();
const slots = useSlots();

const lewSelectRef = ref();
const lewPopoverRef = ref();
const lewPopoverValueRef = ref();
const searchInputRef = ref();
const virtListRef = ref();
const state = reactive({
  selectWidth: 0,
  popoverWidth: 0,
  visible: false,
  loading: false,
  initLoading: true,
  sourceOptions: props.options || [],
  options: flattenSelectOptions(props.options || []),
  keyword: "",
  searchCache: new Map<string, LewSelectMultipleOption[]>(),
});

const formMethods: any = inject("formMethods", {});

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

function getSelectWidth() {
  state.selectWidth = lewSelectRef.value?.clientWidth;
  state.popoverWidth = state.selectWidth - 12;
}

function show() {
  lewPopoverRef.value && lewPopoverRef.value.show();
}

function hide() {
  lewPopoverRef.value && lewPopoverRef.value.hide();
}

const searchDebounce = useDebounceFn(async (e: any) => {
  search(e);
}, props.searchDelay);

async function search(e?: any) {
  state.loading = true;
  const keyword = e?.target.value;
  if (props.searchable) {
    let result: any = [];
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
  selectValue.value = [];
  emit("clear");
  setTimeout(() => {
    lewPopoverRef.value && lewPopoverRef.value.refresh();
  }, 100);
  emit("change", selectValue.value);
  state.visible = false;
  emit("blur");
}

function deleteTag({ value }: { value: any }) {
  const valueIndex = selectValue.value.findIndex(
    (_value: any) => value === _value
  );

  if (valueIndex > -1) {
    const item = selectValue.value[valueIndex];
    selectValue.value.splice(valueIndex, 1);
    emit("delete", cloneDeep(selectValue.value), item);

    if (selectValue.value.length === 0) {
      lewPopoverValueRef.value && lewPopoverValueRef.value.hide();
    }
    setTimeout(() => {
      lewPopoverRef.value && lewPopoverRef.value.refresh();
    }, 100);
    emit("change", selectValue.value);
  }
}

function selectHandle(item: LewSelectMultipleOption) {
  if (item.disabled || item.isGroup) {
    return;
  }

  const _value = selectValue.value || [];

  const index = _value.findIndex((e: string | number) => e === item.value);

  if (index >= 0) {
    _value.splice(index, 1);
  } else {
    _value.push(item.value);
  }

  selectValue.value = _value;
  emit("select", _value);
  setTimeout(() => {
    lewPopoverRef.value && lewPopoverRef.value.refresh();
  }, 100);
  emit("change", selectValue.value);
  getSelectWidth();
}

const getChecked = computed(() => (value: string | number) => {
  if (selectValue.value) {
    return JSON.parse(JSON.stringify(selectValue.value.includes(value)));
  }
  return false;
});

const getSelectedRows = computed(() => {
  const _defaultValue = (props.defaultValue || []).map((e: any) => {
    return {
      label: e,
      value: e,
    };
  });
  if (state.options.length > 0) {
    const selectedRows =
      selectValue.value &&
      selectValue.value.map((v: number | string) => {
        return state.options.find(
          (e: LewSelectMultipleOption) => v === e.value
        );
      });
    if (!selectedRows || selectedRows.length === 0) {
      return _defaultValue;
    }
    return selectedRows;
  }
  return _defaultValue;
});

const getBodyClassName = computed(() => {
  const { size, disabled } = props;
  return object2class("lew-select-body", { size, disabled });
});

const getSelectClassName = computed(() => {
  let { clearable, size, disabled, readonly } = props;
  clearable = clearable ? !!selectValue.value : false;
  const focus = state.visible;
  return object2class("lew-select", {
    clearable,
    size,
    disabled,
    readonly,
    focus,
    "init-loading": state.initLoading,
  });
});

function getSelectItemClassName(e: any) {
  const { disabled, isGroup } = e;
  const active = getChecked.value(e.value);

  return object2class("lew-select-item", {
    disabled,
    active,
    "is-group": isGroup,
  });
}

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16,
  };
  return size[props.size];
});

const focusSearchInput = useDebounceFn(() => {
  if (props.searchable) {
    searchInputRef.value && searchInputRef.value.focus();
  }
}, 100);

function showHandle() {
  state.visible = true;

  getSelectWidth();
  focusSearchInput();

  if (state.options && state.options.length === 0 && props.searchable) {
    search({ target: { value: "" } });
  }

  const indexes = (selectValue.value || [])
    .map((value: any) => state.options.findIndex((e: any) => e.value === value))
    .filter((index: number) => index > -1);

  const minIndex = Math.min(...indexes);
  poll({
    callback: () => {
      if (minIndex > 0 && minIndex !== Infinity) {
        virtListRef.value.scrollToIndex(minIndex);
      } else {
        virtListRef.value.reset();
      }
    },
    vail: () => {
      return !!virtListRef.value;
    },
  });
}

const getVirtualHeight = computed(() => {
  let height = state.options.length * props.itemHeight;
  height = height >= 280 ? 280 : height;
  return height;
});

const isShowScrollBar = computed(() => {
  return getVirtualHeight.value >= 280;
});

function hideHandle() {
  state.visible = false;
  emit("blur");
}

async function init() {
  if (_initMethod.value) {
    try {
      const newOptions = await _initMethod.value();
      state.sourceOptions = newOptions;
      state.options = flattenSelectOptions(newOptions);
    } catch (error) {
      console.error("[LewSelectMultiple] initMethod failed", error);
    }
  }
  if (props.enableSearchCache) {
    state.searchCache.set("", state.options);
  }
  state.initLoading = false;
}

onMounted(() => {
  getSelectWidth();
  focusSearchInput();
  init();
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

watch(
  () => props.options,
  (newOptions) => {
    if (!_initMethod.value) {
      state.sourceOptions = newOptions || [];
      state.options = flattenSelectOptions(newOptions || []);
      if (props.enableSearchCache) {
        state.searchCache.clear();
      }
    }
  },
  {
    deep: true,
  }
);

const getResultText = computed(() => {
  return state.options.length > 0
    ? locale.t("selectMultiple.resultCount", {
        num: numFormat(state.options.filter((e: any) => !e.isGroup).length),
      })
    : "";
});

// 新增计算属性：清除按钮是否显示
const showClearButton = computed(() => {
  return (
    props.clearable &&
    getSelectedRows.value &&
    getSelectedRows.value.length > 0 &&
    !props.readonly
  );
});

// 新增计算属性：是否显示选中项
const hasSelectedItems = computed(() => {
  return getSelectedRows.value && getSelectedRows.value.length > 0;
});

// 新增计算属性：是否显示占位符
const showPlaceholder = computed(() => {
  return getSelectedRows.value && getSelectedRows.value.length === 0;
});

// 新增计算属性：选中项文本
const selectedItemsText = computed(() => {
  if (!hasSelectedItems.value) return "";
  return getSelectedRows.value
    .map((item: any) => item.label)
    .join(props.valueTextSplit);
});

// 新增计算属性：是否显示搜索结果计数
const showResultCount = computed(() => {
  return props.searchable && state.options && state.options.length > 0;
});

// 新增计算属性：是否显示空状态
const showEmptyState = computed(() => {
  return state.options && state.options.length === 0;
});

// 新增计算属性：清除按钮图标类名
const clearButtonIconClass = computed(() => {
  return {
    "lew-form-icon-close-focus": state.visible,
  };
});

// 新增计算属性：选择器图标类名
const selectIconClass = computed(() => {
  return {
    "lew-icon-select-hide": showClearButton.value,
  };
});

// 新增计算属性：占位符文本
const placeholderText = computed(() => {
  return props.placeholder || locale.t("selectMultiple.placeholder");
});

// 新增计算属性：文本值样式
const textValueStyle = computed(() => {
  return {
    opacity: state.visible ? 0.6 : 1,
    width: `calc(${state.selectWidth - 24}px)`,
  };
});

// 新增计算属性：占位符样式
const placeholderStyle = computed(() => {
  return {
    opacity: state.visible ? 0.6 : 1,
  };
});

// 新增计算属性：虚拟列表样式
const virtualListStyle = computed(() => {
  return {
    height: `${getVirtualHeight.value}px`,
    paddingRight: isShowScrollBar.value ? "5px" : "0px",
  };
});

// 新增计算属性：选项项样式
const optionItemStyle = computed(() => {
  return (itemHeight: number) => ({
    height: `${itemHeight}px`,
  });
});

// 新增计算属性：组标签文本
const groupLabelText = computed(() => {
  return (templateProps: any) => {
    return templateProps.isGroup
      ? `${templateProps.label} (${templateProps.total})`
      : templateProps.label;
  };
});

// 新增计算属性：组标签类名
const groupLabelClass = computed(() => {
  return (templateProps: any) => {
    return {
      "is-group": templateProps.isGroup,
    };
  };
});

// 新增计算属性：是否显示搜索输入框
const showSearchInput = computed(() => {
  return props.searchable;
});

// 新增计算属性：是否显示标签布局
const showTagLayout = computed(() => {
  return props.valueLayout === "tag";
});

// 新增计算属性：是否显示自定义空状态插槽
const showCustomEmptySlot = computed(() => {
  return !!slots.empty;
});

// 新增计算属性：是否显示自定义项插槽
const showCustomItemSlot = computed(() => {
  return !!slots.item;
});

// 新增计算属性：项插槽属性
const itemSlotProps = computed(() => {
  return (templateProps: any) => ({
    ...templateProps,
    checked: getChecked.value(templateProps.value),
  });
});

// 新增计算属性：是否显示头部插槽
const showHeaderSlot = computed(() => {
  return !!slots.header;
});

// 新增计算属性：是否显示底部插槽
const showFooterSlot = computed(() => {
  return !!slots.footer;
});
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    popover-body-class-name="lew-select-multiple-popover-body"
    class="lew-select-view"
    :trigger="trigger"
    :trigger-width="width"
    :disabled="disabled || readonly || state.initLoading"
    placement="bottom-start"
    :style="{ width: any2px(width) }"
    :loading="state.loading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div ref="lewSelectRef" class="lew-select" :class="getSelectClassName">
        <div v-if="state.initLoading" class="lew-icon-loading-box">
          <CommonIcon
            :size="getIconSize"
            :loading="state.initLoading"
            type="loading"
          />
        </div>
        <CommonIcon
          v-else
          :size="getIconSize"
          type="chevron-down"
          class="lew-icon-select"
          :class="selectIconClass"
        />
        <transition name="lew-form-icon-ani">
          <CommonIcon
            v-if="showClearButton"
            :size="getIconSize"
            type="close"
            class="lew-form-icon-close"
            :class="clearButtonIconClass"
            @click.stop="clearHandle"
          />
        </transition>
        <template v-if="hasSelectedItems">
          <LewFlex
            v-if="showTagLayout"
            x="start"
            y="center"
            style="padding: 4.5px"
            gap="4px"
            wrap
            class="lew-value"
          >
            <transition-group name="list">
              <LewTag
                v-for="item in getSelectedRows"
                :key="item.value"
                type="light"
                :size="size"
                :closable="!disabled && !readonly"
                @close="deleteTag(item)"
              >
                {{ item.label }}
              </LewTag>
            </transition-group>
          </LewFlex>
          <template v-else>
            <LewPopover
              ref="lewPopoverValueRef"
              trigger="hover"
              popover-body-class-name="lew-select-multiple-popover-tag"
              placement="top-start"
              style="width: 100%"
            >
              <template #trigger>
                <div
                  :style="textValueStyle"
                  class="lew-select-multiple-text-value"
                >
                  {{ selectedItemsText }}
                </div>
              </template>
              <template #popover-body>
                <LewFlex
                  x="start"
                  y="center"
                  gap="5px"
                  wrap
                  :style="{
                    maxWidth: any2px(state.selectWidth),
                  }"
                  class="lew-select-multiple-tag-value"
                >
                  <LewTag
                    v-for="item in getSelectedRows"
                    :key="item.value"
                    type="light"
                    :size="size"
                    :closable="!disabled && !readonly"
                    @close="deleteTag(item)"
                  >
                    {{ item.label }}
                  </LewTag>
                </LewFlex>
              </template>
            </LewPopover>
          </template>
        </template>
        <div
          v-show="showPlaceholder"
          :style="placeholderStyle"
          class="lew-placeholder"
        >
          {{ placeholderText }}
        </div>
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="{
          width: any2px(state.popoverWidth),
        }"
      >
        <slot v-if="showHeaderSlot" name="header" />
        <div v-if="showSearchInput" class="lew-search-input">
          <input
            ref="searchInputRef"
            v-model="state.keyword"
            :placeholder="locale.t('selectMultiple.searchPlaceholder')"
            @input="searchDebounce"
          />
        </div>
        <div class="lew-select-options-box">
          <template v-if="showEmptyState">
            <slot v-if="showCustomEmptySlot" name="empty" />
            <LewFlex v-else direction="y" x="center" class="lew-not-found">
              <LewEmpty :title="locale.t('selectMultiple.noResult')" />
            </LewFlex>
          </template>

          <template v-else>
            <div v-show="showResultCount" class="lew-result-count">
              {{ getResultText }}
            </div>
            <VirtList
              ref="virtListRef"
              :list="state.options"
              :min-size="itemHeight"
              :buffer="5"
              item-key="value"
              :style="virtualListStyle"
              class="lew-select-options-list lew-scrollbar"
            >
              <template #default="{ itemData: templateProps }">
                <div
                  :style="optionItemStyle(itemHeight)"
                  @click="selectHandle(templateProps)"
                >
                  <slot
                    v-if="showCustomItemSlot"
                    name="item"
                    :props="itemSlotProps(templateProps)"
                  />
                  <div
                    v-else
                    class="lew-select-item lew-select-item-mul"
                    :class="getSelectItemClassName(templateProps)"
                  >
                    <LewCheckbox
                      v-if="!templateProps.isGroup"
                      :key="templateProps.value"
                      class="lew-select-checkbox"
                      :checked="getChecked(templateProps.value)"
                    />
                    <LewTextTrim
                      :text="groupLabelText(templateProps)"
                      :delay="[500, 0]"
                      class="lew-select-label"
                      :class="groupLabelClass(templateProps)"
                    />
                  </div>
                </div>
              </template>
            </VirtList>
          </template>
        </div>
        <slot v-if="showFooterSlot" name="footer" />
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

  .lew-select {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: var(--lew-border-radius-small);
    background-color: var(--lew-form-bgcolor);
    transition: all var(--lew-form-transition-ease);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    box-shadow: var(--lew-form-box-shadow);

    .lew-icon-loading-box {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      right: 9px;
      padding: 2px;
      box-sizing: border-box;
      transform: translateY(-50%);
    }

    .lew-icon-select {
      position: absolute;
      top: 50%;
      right: 9px;
      transform: translateY(-50%) rotate(0deg);
      transition: all var(--lew-form-transition-bezier);
      opacity: var(--lew-form-icon-opacity);
      padding: 2px;

      &-hide {
        opacity: 0;
        transform: translate(100%, -50%);
      }
    }

    .lew-placeholder {
      color: rgb(165, 165, 165);
    }

    .lew-select-label-multiple {
      width: 100%;
      display: flex;
      align-items: center;

      .lew-popover {
        display: flex;
        align-items: center;

        > div {
          display: flex;
          align-items: center;
        }
      }
    }

    :deep() {
      .lew-tag {
        background-color: var(--lew-bgcolor-0) !important;
      }
    }

    .lew-placeholder {
      width: calc(100% - 24px);
      transition: all 0.2s;
      height: 100%;
    }

    .lew-value {
      display: flex;
      align-items: center;
      width: calc(100% - 24px);
      transition: all 0.2s;
      min-height: 100%;
      padding: 2px 0;
    }

    .lew-placeholder,
    .lew-select-multiple-text-value {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      box-sizing: border-box;
    }

    &:hover {
      background-color: var(--lew-form-bgcolor-hover);
    }

    &:active {
      background-color: var(--lew-form-bgcolor-active);
    }
  }

  .lew-select-size {
    &-small {
      min-height: var(--lew-form-item-height-small);

      .lew-placeholder,
      .lew-select-multiple-text-value {
        font-size: var(--lew-form-font-size-small);
        margin-left: 10px;
        padding-right: 26px;
        line-height: calc(
          var(--lew-form-item-height-small) - (var(--lew-form-border-width) * 2)
        );
      }

      .lew-value {
        padding: 1px 0;
      }
    }

    &-medium {
      min-height: var(--lew-form-item-height-medium);

      .lew-placeholder,
      .lew-select-multiple-text-value {
        font-size: var(--lew-form-font-size-medium);
        margin-left: 12px;
        padding-right: 28px;
        line-height: calc(
          var(--lew-form-item-height-medium) -
            (var(--lew-form-border-width) * 2)
        );
      }

      .lew-value {
        padding: 2px 0;
      }
    }

    &-large {
      min-height: var(--lew-form-item-height-large);

      .lew-placeholder,
      .lew-select-multiple-text-value {
        font-size: var(--lew-form-font-size-large);
        margin-left: 14px;
        padding-right: 30px;
        line-height: calc(
          var(--lew-form-item-height-large) - (var(--lew-form-border-width) * 2)
        );
      }

      .lew-value {
        padding: 3px 0;
      }
    }
  }

  .lew-select-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
      solid;

    :deep() {
      .lew-tag {
        background-color: var(--lew-color-primary-light) !important;
      }
    }

    .lew-icon-select {
      transform: translateY(-50%) rotate(180deg);
      color: var(--lew-text-color-1);

      &-hide {
        opacity: 0;
        transform: translate(100%, -50%) rotate(180deg);
      }
    }
  }

  .lew-select-focus:hover {
    background-color: var(--lew-form-bgcolor-focus);
  }

  .lew-select-readonly {
    pointer-events: none;

    .lew-select {
      user-select: text;
    }
  }

  .lew-select-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;

    &:hover {
      border-radius: var(--lew-border-radius-small);
      background-color: var(--lew-form-bgcolor);
      border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    }
  }

  .lew-select-init-loading {
    pointer-events: none;
    cursor: wait;

    .lew-placeholder,
    .lew-select-multiple-text-value {
      cursor: wait;
    }
  }
}

.list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all var(--lew-form-transition-bezier);
  }

  &-enter-from {
    opacity: 0;
    transform: translateX(-5px);
  }

  &-leave-to {
    opacity: 0;
    transform: scaleX(0);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>

<style lang="scss">
.lew-select-multiple-popover {
  &-body {
    padding: 6px;
  }

  &-tag {
    .lew-select-multiple-tag-value {
      padding: 5px;
      box-sizing: border-box;
    }
  }
}

.lew-select-body {
  width: 100%;
  box-sizing: border-box;

  .lew-search-input {
    margin-bottom: 5px;
    padding: 0px 5px;

    input {
      outline: none;
      border: none;
      background-color: transparent;
      width: 100%;
      height: 32px;
      padding: 0px 7px;
      box-sizing: border-box;
      transition: all var(--lew-form-transition-bezier);
      border-bottom: var(--lew-form-border-width) var(--lew-form-bgcolor-hover)
        solid;
      color: var(--lew-text-color-2);

      &:focus {
        border-bottom: var(--lew-form-border-width)
          var(--lew-form-border-color-focus) solid;
      }
    }

    input:placeholder {
      color: rgb(165, 165, 165);
    }
  }

  .lew-select-options-box {
    overflow-y: auto;
    overflow-x: hidden;
    height: auto;
    box-sizing: border-box;
    transition: all 0.25s ease;
    margin-top: -4px;
    margin-bottom: -4px;

    .lew-select-item {
      &-mul {
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        color: var(--lew-text-color-1);
        box-sizing: border-box;
        margin-top: 2px;

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

          &.is-group {
            padding-left: 12px;
            color: var(--lew-text-color-7);
            font-size: 12px;
            pointer-events: none;
            padding-top: 4px;
          }
        }
      }

      &-disabled {
        opacity: var(--lew-disabled-opacity);
        pointer-events: none;
      }

      &:hover {
        color: var(--lew-text-color-0);
        background-color: var(--lew-pop-bgcolor-hover);

        .lew-checkbox {
          .lew-checkbox-icon-box {
            border: var(--lew-form-border-width)
              var(--lew-checkbox-border-color-hover) solid;
            background: var(--lew-form-bgcolor);
          }
        }
      }

      &-active {
        color: var(--lew-checkbox-color);
        font-weight: bold;
        background-color: var(--lew-pop-bgcolor-hover);

        .icon-check {
          margin-right: 10px;
        }

        &:hover {
          color: var(--lew-checkbox-color);
          font-weight: bold;
          background-color: var(--lew-pop-bgcolor-hover);

          .lew-checkbox {
            .lew-checkbox-icon-box {
              border: var(--lew-form-border-width) var(--lew-checkbox-color)
                solid;
              background: var(--lew-checkbox-color);

              .icon-checkbox {
                transform: translate(-50%, -50%) scale(0.7);
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }

  .lew-result-count {
    padding: 5px 12px;
    font-size: 13px;
    opacity: 0.7;
  }
}
</style>
