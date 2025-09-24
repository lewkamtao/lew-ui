<script setup lang="ts">
import type { LewCascaderOption } from "lew-ui/types";
import type { CascaderNodeCache } from "../../cascader/src/cascader";
import { LewCheckbox, LewPopover, LewTooltip } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import CommonInput from "lew-ui/_components/CommonInput.vue";
import { useTreeSelection } from "lew-ui/hooks";
import { any2px, object2class } from "lew-ui/utils";
import { cloneDeep, isEqual, isFunction } from "lodash-es";
import { VirtList } from "vue-virt-list";
import {
  createCascaderCache,
  findAndAddChildrenByValue,
  findChildrenByValue,
  findObjectByValue,
  formatTree,
} from "../../cascader/src/cascader";
import { cascaderMultipleEmits } from "./emits";
import { cascaderMultipleProps } from "./props";

const props = defineProps(cascaderMultipleProps);
const emit = defineEmits(cascaderMultipleEmits);
const modelValue = defineModel<string[]>();

const app = getCurrentInstance()?.appContext.app;
if (app && !app.directive("tooltip")) {
  app.use(LewTooltip);
}

const lewPopoverRef = ref();

const state = reactive({
  visible: false,
  loading: false,
  initLoading: true,
  okLoading: false,
  optionsGroup: [] as LewCascaderOption[][],
  optionsTree: [] as LewCascaderOption[],
  activeValues: [] as string[],
});

const loadedDataCache = new Map<string, LewCascaderOption[]>();
const nodeCache: CascaderNodeCache = createCascaderCache();

const loadedData = reactive<Record<string, LewCascaderOption[]>>({});

const formMethods: any = inject("formMethods", {});

// 将 LewCascaderOption 转换为 TreeNode 格式
function convertToTreeNodes(
  options: LewCascaderOption[]
): Array<{ key: string; children?: any; disabled?: boolean }> {
  return options.map((option: LewCascaderOption) => ({
    key: option.value,
    children: option.children ? convertToTreeNodes(option.children) : undefined,
    disabled: option.disabled,
  }));
}

const {
  selectedKeys,
  init: initTreeSelection,
  isSelected,
  isIndeterminate,
  removeKey,
  toggleKey,
  findItemsByValues,
} = useTreeSelection();

// 防止循环更新的标志
let isInternalUpdate = false;

const _loadMethod = computed(() => {
  if (isFunction(props.loadMethod)) {
    return props.loadMethod;
  } else if (props.loadMethodId) {
    return formMethods[props.loadMethodId];
  }
  return false;
});

const _initMethod = computed(() => {
  if (isFunction(props.initMethod)) {
    return props.initMethod;
  } else if (props.initMethodId) {
    return formMethods[props.initMethodId];
  }
  return false;
});

async function init() {
  let _tree: LewCascaderOption[] = [];
  try {
    if (_initMethod.value) {
      const newOptions = await _initMethod.value();
      _tree = newOptions || [];
    } else if (_loadMethod.value && !state.loading) {
      state.loading = true;
      _tree = (await _loadMethod.value()) || [];
      state.loading = false;
    } else if (props.options?.length) {
      _tree = props.options.map((e: LewCascaderOption) => ({
        ...e,
        isLeaf: !e.children?.length,
      }));
    }
    nodeCache.clear();
    loadedDataCache.clear();
    const formattedTree = formatTree(_tree);
    state.optionsGroup = [formattedTree];
    state.optionsTree = formattedTree;

    // 设置树形数据到 hook
    if (formattedTree.length > 0) {
      const tree = convertToTreeNodes(formattedTree);
      // 初始化时同步 modelValue 到选中状态

      initTreeSelection({ tree, keys: modelValue.value || [] });
    }
  } catch (error) {
    console.error("Cascader initialization failed:", error);
    state.optionsGroup = [];
    state.optionsTree = [];
  } finally {
    state.initLoading = false;
    state.loading = false;
  }
}

init();

watch(
  () => props.options,
  (newOptions) => {
    if (!_initMethod.value && newOptions?.length) {
      const _tree = newOptions.map((e: LewCascaderOption) => ({
        ...e,
        isLeaf: !e.children?.length,
      }));
      nodeCache.clear();
      loadedDataCache.clear();
      const formattedTree = formatTree(_tree);
      state.optionsGroup = [formattedTree];
      state.optionsTree = formattedTree;

      // 更新树形数据到 hook
      if (formattedTree.length > 0) {
        const tree = convertToTreeNodes(formattedTree);

        // 当树结构更新后，重新同步 modelValue 到选中状态
        if (
          modelValue.value &&
          Array.isArray(modelValue.value) &&
          modelValue.value.length > 0
        ) {
          initTreeSelection({ tree, keys: modelValue.value });
        }
      }
    }
  },
  {
    deep: true,
    flush: "post",
  }
);

// 监听 modelValue 变化，实现单向数据绑定
watch(
  () => modelValue.value,
  (newValue) => {
    if (isInternalUpdate) {
      return; // 如果是内部更新，跳过处理
    }

    initTreeSelection({ keys: newValue || [] });
  },
  {
    immediate: false, // 不需要立即执行，因为初始化时已经处理过了
    deep: true,
  }
);

function changeCheck(item: LewCascaderOption) {
  if (item.disabled) {
    return;
  }

  const itemValue = item.value;
  if (props.free) {
    const isSelected = modelValue.value?.includes(itemValue);
    if (isSelected) {
      modelValue.value = modelValue.value?.filter(
        (value) => value !== itemValue
      );
    } else {
      modelValue.value = [...(modelValue.value || []), itemValue];
    }
    emit("change", modelValue.value as string[] | undefined);
  } else {
    toggleKey(itemValue);
    updateModelValue();
  }
}

function updateModelValue() {
  isInternalUpdate = true;

  if (props.onlyLeafSelectable) {
    modelValue.value = findItemsByValues(selectedKeys.value)
      .filter((item: any) => item.isLeaf)
      .map((item: any) => item.key);
  } else {
    modelValue.value = cloneDeep(selectedKeys.value);
  }

  emit("change", modelValue.value as string[] | undefined);

  nextTick(() => {
    isInternalUpdate = false;
  });
}

// 辅助方法：更新树结构并同步选中状态
function updateTreeStructure() {
  if (state.optionsTree.length > 0) {
    const tree = convertToTreeNodes(state.optionsTree);
    // 保持当前的选中状态，重新初始化树结构
    const currentKeys =
      modelValue.value && Array.isArray(modelValue.value)
        ? modelValue.value
        : [];
    initTreeSelection({ tree, keys: currentKeys });
  }
}

async function selectItem(item: LewCascaderOption, level: number) {
  // 非叶子节点，处理展开逻辑
  if (!item.isLeaf && !isEqual(item.valuePaths, state.activeValues)) {
    state.optionsGroup = state.optionsGroup.slice(0, level + 1);
    if (_loadMethod.value && !item.isLeaf) {
      if (loadedDataCache.has(item.value)) {
        const _options = loadedDataCache.get(item.value)!;
        state.optionsGroup.push(_options);
      } else if (loadedData[item.value]) {
        const _options = loadedData[item.value];
        state.optionsGroup.push(_options);
        loadedDataCache.set(item.value, _options);
      } else {
        item.loading = true;
        state.okLoading = true;
        const loadParam = {
          value: item.value,
          label: item.label,
          level,
        };
        const new_options = (await _loadMethod.value(loadParam)) || [];
        // 格式化新加载的数据，添加路径信息
        const formattedNewOptions = formatTree(
          new_options,
          item.valuePaths,
          item.labelPaths
        );
        findAndAddChildrenByValue(
          state.optionsTree,
          item.value,
          formattedNewOptions,
          nodeCache
        );

        // 重要：异步获取数据后，需要更新树结构并同步选中状态
        updateTreeStructure();
        nextTick(() => {
          updateModelValue();
        });
        const _options = findChildrenByValue(
          state.optionsTree,
          item.value,
          nodeCache
        );
        state.optionsGroup.push(_options);
        loadedDataCache.set(item.value, _options);
        loadedData[item.value] = _options;
        item.loading = false;
        state.okLoading = false;
      }
    } else if (!item.isLeaf && item.children) {
      // 确保静态子节点也有正确的路径信息
      const _options = item.children.map((e) => ({
        ...e,
        isLeaf: !e.children?.length,
      }));
      state.optionsGroup.push(_options);
    }
  }

  if (item.isLeaf) return;

  if (isEqual(item.valuePaths, state.activeValues)) {
    state.activeValues = (item.parentValuePaths as string[]) || [];
    if (level < state.optionsGroup.length - 1) {
      state.optionsGroup.pop();
    }
  } else {
    state.activeValues = (item.valuePaths as string[]) || [];
  }
}

onBeforeUnmount(() => {
  nodeCache.clear();
  loadedDataCache.clear();
});

async function show() {
  try {
    await lewPopoverRef.value?.show();
  } catch (error) {
    console.warn("Failed to show cascader popover:", error);
  }
}

function hide() {
  try {
    lewPopoverRef.value?.hide();
  } catch (error) {
    console.warn("Failed to hide cascader popover:", error);
  }
}

function clearHandle() {
  Object.assign(state, {
    activeValues: [],
    visible: false,
  });

  // 清空选中状态
  initTreeSelection({ keys: [] });

  isInternalUpdate = true;
  modelValue.value = undefined;
  emit("change", modelValue.value as string[] | undefined);
  emit("clear");

  nextTick(() => {
    isInternalUpdate = false;
  });
}

function deleteTag(value: string) {
  // 使用removeKey移除该值，让hook自动处理父子关系
  removeKey(value);

  updateModelValue();
  emit("delete", modelValue.value as string[], value);
}

function showHandle() {
  state.visible = true;
}

function hideHandle() {
  state.visible = false;
}

const getCascaderWidth = computed(() => {
  const validGroups = state.optionsGroup.filter((group) => group?.length > 0)
    .length;
  return Math.max(validGroups, 1) * 200;
});

const VIRT_LIST_STYLE = {
  padding: "6px 6px 2px 6px",
  boxSizing: "border-box" as const,
};

const ITEM_PADDING_STYLE = {
  height: "38px",
};

const getCascaderBodyStyle = computed(() => ({
  width: `${getCascaderWidth.value}px`,
}));

const getBodyClassName = computed(() => {
  const { size, disabled } = props;
  return object2class("lew-cascader-multiple-body", { size, disabled });
});

function getItemClass(templateProps: any) {
  const isSelected =
    Array.isArray(modelValue.value) &&
    modelValue.value.includes(templateProps.value);
  return {
    "lew-cascader-multiple-item-disabled": templateProps.disabled,
    "lew-cascader-multiple-item-active":
      state.activeValues?.includes(templateProps.value) || false,
    "lew-cascader-multiple-item-selected": isSelected,
  };
}

// 添加格式化已选项的计算属性
const formatItems = computed(() => {
  if (!modelValue.value || !Array.isArray(modelValue.value)) {
    return [];
  }

  return modelValue.value.map((value: string) => {
    const { label, labelPaths }: any = findObjectByValue(
      state.optionsTree,
      value,
      nodeCache
    );
    return {
      value,
      label: props.showAllLevels ? labelPaths.join(" / ") : label,
    };
  });
});

function getItemWrapperStyle(oIndex: number, oItem: any) {
  const style = {
    zIndex: 20 - oIndex,
    borderRadius: `0 ${
      oIndex === state.optionsGroup.length - 1
        ? "var(--lew-border-radius-small)"
        : "0"
    } 0 0`,
    transform: oItem.length > 0 ? `translateX(${200 * oIndex}px)` : "",
  };
  return style;
}

defineExpose({
  show,
  hide,
});
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    class="lew-cascader-multiple-view"
    :trigger="trigger"
    :trigger-width="width"
    :disabled="disabled || readonly || state.initLoading"
    placement="bottom-start"
    :loading="state.loading"
    :style="{ width: any2px(width) }"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <CommonInput
        v-model="modelValue"
        :loading="state.initLoading"
        :clearable="clearable"
        :readonly="readonly"
        :disabled="disabled || state.initLoading"
        :size="size"
        :placeholder="placeholder"
        :value-layout="valueLayout"
        :value-text-split="valueTextSplit"
        :width="any2px(width)"
        :is-focus="state.visible"
        :format-items
        @clear="clearHandle"
        @delete="deleteTag"
      />
    </template>
    <template #popover-body>
      <div
        class="lew-cascader-multiple-body"
        :style="getCascaderBodyStyle"
        :class="getBodyClassName"
      >
        <slot name="header" />
        <transition name="fade">
          <div
            v-if="state.optionsGroup.length > 0"
            class="lew-cascader-multiple-options-box"
          >
            <template
              v-for="(oItem, oIndex) in state.optionsGroup"
              :key="oIndex"
            >
              <div
                class="lew-cascader-multiple-item-wrapper"
                :style="getItemWrapperStyle(oIndex, oItem)"
              >
                <VirtList
                  :key="oItem?.[0]?.parentValuePaths?.join('-') || 'root'"
                  class="lew-scrollbar-hover"
                  :list="oItem"
                  :min-size="38"
                  :buffer="5"
                  item-key="value"
                  :style="VIRT_LIST_STYLE"
                >
                  <template #default="{ itemData: templateProps }">
                    <div
                      class="lew-cascader-multiple-item-padding"
                      :style="ITEM_PADDING_STYLE"
                      @click="selectItem(templateProps, oIndex)"
                    >
                      <div
                        class="lew-cascader-multiple-item"
                        :class="getItemClass(templateProps)"
                      >
                        <LewCheckbox
                          :key="templateProps.value"
                          class="lew-cascader-multiple-checkbox"
                          :checked="
                            props.free
                              ? modelValue?.includes(templateProps.value)
                              : isSelected(templateProps.value)
                          "
                          :certain="
                            !props.free && isIndeterminate(templateProps.value)
                          "
                          :disabled="templateProps.disabled"
                          @change="changeCheck(templateProps)"
                        />

                        <div
                          :title="templateProps.label"
                          class="lew-cascader-multiple-label"
                        >
                          {{ templateProps.label }}
                        </div>

                        <CommonIcon
                          v-show="templateProps.loading"
                          :size="14"
                          loading
                          class="lew-cascader-multiple-loading-icon"
                          type="loader"
                        />
                        <CommonIcon
                          v-show="
                            !templateProps.loading && !templateProps.isLeaf
                          "
                          :size="16"
                          class="lew-cascader-multiple-icon"
                          type="chevron-right"
                        />
                      </div>
                    </div>
                  </template>
                </VirtList>
              </div>
            </template>
          </div>
        </transition>
      </div>
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-cascader-multiple-view {
  width: 100%;

  > div {
    width: 100%;
  }
}

.lew-cascader-multiple-body {
  width: 100%;
  box-sizing: border-box;
  min-width: 200px;
  height: 320px;
  overflow: hidden;
  transition: all var(--lew-form-transition-bezier);
  user-select: none;

  .not-found {
    opacity: 0.4;
  }

  .result-count {
    padding-left: 8px;
    margin: 5px 0px;
    opacity: 0.4;
    font-size: 13px;
  }

  .lew-cascader-multiple-options-box {
    position: relative;
    display: flex;
    box-sizing: border-box;
    height: 100%;

    .lew-cascader-multiple-item-wrapper {
      position: absolute;
      overflow: hidden;
      height: 100%;
      width: 200px;
      box-sizing: border-box;
      gap: 4px;
    }

    .lew-cascader-multiple-item-wrapper::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: var(--lew-pop-border-color);
    }

    .lew-cascader-multiple-item-wrapper:last-child::after {
      display: none;
    }

    .lew-cascader-multiple-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 6px;
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
      flex-shrink: 0;
      padding: 0px 12px;

      .lew-cascader-multiple-icon {
        position: absolute;
        right: 2px;
        top: 10px;
        color: var(--lew-text-color-1);
      }

      .lew-cascader-multiple-loading-icon {
        position: absolute;
        right: 5px;
        top: 8.5px;
      }

      .lew-cascader-multiple-label {
        position: relative;
        z-index: 5;
        width: calc(100% - 36px);
        user-select: none;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }
    }

    .lew-cascader-multiple-item:hover {
      .icon {
        opacity: 1;
      }
    }

    .lew-cascader-multiple-item-disabled {
      opacity: var(--lew-disabled-opacity);
      pointer-events: none;
    }

    .lew-cascader-multiple-item-align-left {
      text-align: left;
    }

    .lew-cascader-multiple-item-align-center {
      text-align: center;
    }

    .lew-cascader-multiple-item-align-right {
      text-align: right;
    }

    .lew-cascader-multiple-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-form-bgcolor);
    }

    .lew-cascader-multiple-slot-item {
      border-radius: 6px;
    }

    .lew-cascader-multiple-slot-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-form-bgcolor);
    }

    .lew-cascader-multiple-item-active {
      background-color: var(--lew-form-bgcolor);

      .lew-cascader-multiple-icon {
        opacity: 1;
      }

      .icon-check {
        margin-right: 10px;
      }
    }
  }
}
</style>
