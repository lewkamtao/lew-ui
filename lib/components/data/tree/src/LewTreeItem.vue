<script setup lang="ts">
import { LewCheckbox, LewCollapseTransition, LewMessage } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import RenderComponent from "lew-ui/_components/RenderComponent.vue";
import { insertChildByKey } from "lew-ui/utils";
import { cloneDeep } from "lodash-es";
import { treeItemProps } from "./props";
import transformTree, { formatTree } from "./transformTree";
import { treeItemEmits } from "./treeItemEmits";
import { TREE_INJECTION_KEY } from "./types";

const props = defineProps(treeItemProps);
const emit = defineEmits(treeItemEmits);

// 使用类型安全的 inject
const treeContext = inject(TREE_INJECTION_KEY)!;
const {
  modelValue,
  expandKeys,
  dataSource,
  cacheDataSource,
  multiple,
  checkable,
  expandAll,
  loadMethod,
  keyField,
  labelField,
  free,
  treeSelection,
} = treeContext;

const loading = ref(false);
const loaded = ref(false);

function select() {
  if (props.disabled || !props.__key) return;

  const nodeKey = props.__key;

  if (multiple) {
    if (free) {
      // free 模式：简单的切换选中状态，不级联
      // 确保始终使用数组
      const currentValue = modelValue.value;
      const newModelValue = Array.isArray(currentValue)
        ? [...currentValue]
        : [];
      const index = newModelValue.indexOf(nodeKey);
      if (index > -1) {
        newModelValue.splice(index, 1);
      } else {
        newModelValue.push(nodeKey);
      }
      modelValue.value = newModelValue;
    } else {
      // 使用 Hook 的 toggleKey，自动处理级联和半选状态
      treeSelection?.toggleKey(nodeKey);
    }
  } else {
    // 单选模式：直接设置值
    modelValue.value = nodeKey;
  }

  emit("change");
}

async function expand() {
  if (!props.isLeaf && props.__key) {
    const nodeKey = props.__key;
    const index = expandKeys.value.indexOf(nodeKey);
    if (index > -1) {
      expandKeys.value.splice(index, 1);
    } else if (loadMethod && !loading.value && !loaded.value) {
      loading.value = true;
      const _tree =
        ((await loadMethod(
          cloneDeep({
            ...props,
            key: nodeKey,
            value: nodeKey,
            extend: props.extend,
          }) as any
        )) as any) || [];

      const { status, result, error } = (await transformTree({
        dataSource: _tree,
        keyField,
        labelField,
        free,
      })) as any;
      if (status === "success") {
        loaded.value = true;
        insertChildByKey(dataSource.value, nodeKey as string | number, result);

        dataSource.value = formatTree({
          dataSource: dataSource.value,
          keyField,
          labelField,
          free,
        });

        cacheDataSource.value = cloneDeep(dataSource.value);

        expandKeys.value = [...expandKeys.value, nodeKey];
      } else {
        loaded.value = false;
        LewMessage.error(error.message);
      }
      loading.value = false;
    } else {
      expandKeys.value.push(nodeKey);
    }
  }
  expandKeys.value = cloneDeep(expandKeys.value);
  emit("expand");
}

// 计算节点的选中状态
const isNodeSelected = computed(() => {
  if (!props.__key) return false;

  if (multiple) {
    if (free) {
      // free 模式：直接查看 modelValue
      return modelValue.value?.includes(props.__key) || false;
    } else {
      // 使用 Hook 的 isSelected 方法
      return treeSelection?.isSelected(props.__key) || false;
    }
  } else {
    return modelValue.value === props.__key;
  }
});

// 计算节点的半选状态
const isNodePartiallySelected = computed(() => {
  if (!multiple || free || !props.__key) return false;

  // 使用 Hook 的 isIndeterminate 方法
  return treeSelection?.isIndeterminate(props.__key) || false;
});
</script>

<template>
  <div
    class="lew-tree-item"
    :class="{
      'lew-tree-item-expand-all': expandAll,
      'lew-tree-item-expand': __key
        ? (expandKeys || []).includes(__key)
        : false,
      'lew-tree-item-certain': isNodePartiallySelected,
      'lew-tree-item-selected': isNodeSelected,
      'lew-tree-item-leaf': isLeaf,
      'lew-tree-item-disabled': disabled,
    }"
  >
    <div class="lew-tree-chevron-right" @click.stop="expand">
      <CommonIcon
        v-if="loading"
        :size="14"
        loading
        class="lew-cascader-loading-icon"
        type="loader"
      />
      <CommonIcon
        v-else
        class="lew-tree-chevron-right-icon"
        :size="14"
        type="chevron-right"
      />
    </div>
    <div class="lew-tree-item-label" @click="select">
      <LewCheckbox
        v-if="checkable"
        :certain="isNodePartiallySelected"
        :checked="isNodeSelected"
        class="lew-tree-checkbox"
      />
      <slot
        v-if="$slots.item"
        name="item"
        :props="{
          ...props,
          checked: isNodeSelected,
          certain: isNodePartiallySelected,
        }"
      />
      <template v-else>
        <RenderComponent :render-fn="icon" />
        <RenderComponent
          :render-fn="label"
          type="text-trim"
          :component-props="{
            placement: 'right',
            delay: [250, 250],
          }"
        />
      </template>
    </div>
  </div>
  <LewCollapseTransition v-if="!isLeaf">
    <div
      v-if="
        ((expandKeys || []).length > 0 &&
          __key &&
          expandKeys.includes(__key)) ||
        expandAll
      "
      class="lew-tree-item-main"
    >
      <slot />
    </div>
  </LewCollapseTransition>
</template>

<style lang="scss" scoped>
.lew-tree-item {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  width: 100%;
  box-sizing: border-box;
  .lew-tree-chevron-right {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform var(--lew-form-transition-bezier);
    width: 14px;
    height: 14px;
    padding: 4px;
    box-sizing: content-box;
    border-radius: var(--lew-border-radius-small);
    margin-left: 5px;
    .lew-tree-chevron-right-icon {
      transform: rotate(0deg);
      transition: transform var(--lew-form-transition-bezier);
    }
  }
  .lew-tree-chevron-right:hover {
    background-color: var(--lew-pop-bgcolor-hover);
  }
  .lew-tree-item-label {
    position: relative;
    display: flex;
    align-items: center;
    padding: 4px 10px 4px 8px;
    width: 100%;
    box-sizing: border-box;
    border-radius: calc(var(--lew-border-radius-small) - 1px);
    cursor: pointer;
  }

  .lew-tree-item-label::after {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    content: "";
    width: 100%;
    height: 100%;
  }
  .lew-tree-checkbox {
    margin-right: 6px;
  }
  .lew-tree-item-label:hover {
    background-color: var(--lew-pop-bgcolor-hover);
    user-select: none;
    .lew-checkbox:deep(.lew-checkbox-icon-box) {
      border: var(--lew-form-border-width) var(--lew-checkbox-icon-border-hover)
        solid;
      background: var(--lew-checkbox-icon-bg-hover);
    }
  }
}
.lew-tree-item-selected {
  .lew-tree-item-label {
    color: var(--lew-color-primary);
    font-weight: 600;
  }
  .lew-tree-item-label:hover {
    .lew-checkbox:deep(.lew-checkbox-icon-box) {
      border: var(--lew-form-border-width)
        var(--lew-checkbox-checked-icon-border-hover) solid;
      background: var(--lew-checkbox-checked-icon-bg-hover);
      .icon-checkbox {
        transform: translate(-50%, -50%) scale(0.7);
        opacity: 1;
        color: var(--lew-checkbox-checked-icon-color-hover);
      }
    }
  }
}

.lew-tree-item-certain {
  .lew-tree-item-label:hover {
    .lew-checkbox:deep(.lew-checkbox-icon-box) {
      border: var(--lew-form-border-width)
        var(--lew-checkbox-checked-icon-border-hover) solid;
      background: var(--lew-checkbox-checked-icon-bg-hover);
      .lew-checkbox-icon-certain {
        background-color: var(--lew-checkbox-checked-icon-color-hover);
      }
    }
  }
}

.lew-tree-item-leaf {
  .lew-tree-chevron-right {
    opacity: 0;
  }
  .lew-tree-chevron-right {
    cursor: default;
  }
}
.lew-tree-item-disabled {
  .lew-tree-chevron-right {
    cursor: pointer;
  }
  .lew-tree-item-label {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }
}
.lew-tree-item-expand {
  .lew-tree-chevron-right {
    .lew-tree-chevron-right-icon {
      transform: rotate(90deg);
    }
  }
}
.lew-tree-item-expand-all {
  cursor: default;
  .lew-tree-chevron-right {
    pointer-events: none;
    .lew-tree-chevron-right-icon {
      transform: rotate(90deg);
    }
  }
}
.lew-tree-item-main {
  display: flex;
  flex-direction: column;
  margin-left: 15.5px;
  width: calc(100% - 15.5px);
  box-sizing: border-box;
}
</style>
