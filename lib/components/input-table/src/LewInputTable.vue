<script setup lang="ts">
import { cloneDeep } from 'lodash-es';
import FormModal from './FormModal.vue';
import { inputTableProps } from './props';
import type { InputTableColumn } from './props';
import { any2px, getUniqueId } from 'lew-ui/utils';
import Icon from 'lew-ui/utils/Icon.vue';
import { LewTable, LewButton, LewFlex, LewEmpty, LewMessage } from 'lew-ui';
import { locale } from 'lew-ui';

// 获取app
const app = getCurrentInstance()?.appContext.app;
if (app && !app.directive('tooltip')) {
  app.use(LewMessage);
}
const modelValue: Ref<Array<any>> = defineModel({ required: true });

const setUseId = () => {
  (modelValue.value || []).forEach((e: any) => {
    if (!e.id) {
      e.id = getUniqueId();
    }
  });
};

setUseId();
watch(modelValue.value, () => {
  setUseId();
});

const props = defineProps(inputTableProps);

const inputTableColumns = computed(() => {
  return [
    ...props.columns,
    ...(props.deletable || props.addable
      ? [
          {
            title: '操作',
            width: 90,
            field: 'action',
            x: 'center',
            fixed: 'right',
          },
        ]
      : []),
  ];
});

const formOptions = computed(() => {
  return (props.columns || []).map((e: any) => {
    const { as, title, field, props, required } = e;
    return {
      label: title,
      field,
      as: as || 'input',
      required,
      props,
    };
  });
});

const formModalRef = ref();
const edit = ({ row, index }: { row: any; index: number }) => {
  formModalRef.value.open({ row, index });
};
const del = ({ index }: { index: number }) => {
  if ((modelValue.value || []).length <= props.minRows) {
    LewMessage.warning(locale.t('inputTable.minRows'));
    return;
  }
  LewDialog.error({
    title: locale.t('inputTable.deleteConfirm'),
    okText: locale.t('inputTable.delete'),
    cancelText: locale.t('inputTable.cancel'),
    content: locale.t('inputTable.deleteConfirmContent'),
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      modelValue.value.splice(index, 1);
    },
  });
};
const add = () => {
  if ((modelValue.value || []).length >= props.maxRows) {
    LewMessage.warning(locale.t('inputTable.maxRows'));
    return;
  }
  let row: any = cloneDeep(props.defaultForm);
  if (props.autoUniqueId) {
    row['id'] = getUniqueId();
  }
  formModalRef.value.open({ row });
};

const addSuccess = ({ row }: { row: any }) => {
  if (!Array.isArray(modelValue.value)) {
    modelValue.value = [row];
  } else {
    modelValue.value.push(row);
  }
};

const editSuccess = ({ row, index }: { row: any; index: number }) => {
  modelValue.value.splice(index, 1, row);
};

const selectedKeys = ref<string[]>([]);

const checkUniqueFieldFn = (form: any) => {
  if (!props.uniqueField) {
    return true;
  }
  const fieldValue = form[props.uniqueField];
  const vail = !modelValue.value.some(
    (item) => item[props.uniqueField] === fieldValue
  );
  if (!vail) {
    const label = formOptions.value.find(
      (e: any) => e.field === props.uniqueField
    )?.label;
    LewMessage.warning(locale.t('inputTable.uniqueFieldExist', { label }));
    return false;
  }
  return true;
};

const isMaxRowsReached = computed(
  () => (modelValue.value || []).length >= props.maxRows
);

const getAddButtonStyle = computed(() => {
  const paddingMap = {
    small: '8px',
    medium: '10px',
    large: '12px',
  };
  const fontSizeMap = {
    small: 13,
    medium: 14,
    large: 16,
  };
  return {
    padding: paddingMap[props.size],
    fontSize: fontSizeMap[props.size] + 'px',
  };
});

const getIconStyle = computed(() => {
  const sizeMap = {
    small: '24px',
    medium: '26px',
    large: '28px',
  };
  return {
    width: sizeMap[props.size],
    height: sizeMap[props.size],
  };
});

const getIconSize = computed(() => {
  const sizeMap = {
    small: 13,
    medium: 14,
    large: 16,
  };
  return sizeMap[props.size];
});
</script>

<template>
  <lew-flex
    x="start"
    y="start"
    direction="y"
    :style="{
      width: any2px(width),
    }"
  >
    <lew-table
      :size="size"
      :sortable="sortable"
      :row-key="rowKey"
      :sortTooltipCustomRender="sortTooltipCustomRender"
      multiple
      :columns="inputTableColumns as InputTableColumn[]"
      :data-source="modelValue"
      v-model:selectedKeys="selectedKeys"
    >
      <template #table-header>
        <slot name="table-header"></slot>
      </template>
      <template #table-footer>
        <lew-flex direction="y" x="center" y="center">
          <lew-flex
            x="center"
            y="center"
            v-if="addable"
            @click="add"
            class="add-btn"
            :class="{ disabled: isMaxRowsReached }"
            :style="getAddButtonStyle"
          >
            <Icon :size="getIconSize" type="plus"></Icon>
            {{ locale.t('inputTable.addText') }}
          </lew-flex>
        </lew-flex>
      </template>
      <template #action="{ row, index }">
        <lew-flex gap="5" x="center">
          <lew-button
            v-if="addable"
            type="text"
            color="gray"
            :style="getIconStyle"
            size="small"
            single-icon
            round
            @click="edit({ row, index })"
          >
            <Icon :size="getIconSize" type="edit-2" />
          </lew-button>
          <lew-button
            v-if="deletable"
            type="text"
            color="red"
            size="small"
            :style="getIconStyle"
            round
            single-icon
            @click="del({ index })"
          >
            <Icon :size="getIconSize" type="trash" />
          </lew-button>
        </lew-flex>
      </template>
    </lew-table>
    <FormModal
      ref="formModalRef"
      :options="formOptions"
      :size="size"
      :checkUniqueFieldFn="checkUniqueFieldFn"
      :okText="locale.t('inputTable.save')"
      @addSuccess="addSuccess"
      @editSuccess="editSuccess"
    />
  </lew-flex>
</template>
<style lang="scss" scoped>
.header-action {
  padding: 7px;
  border-bottom: 1px var(--lew-bgcolor-3) solid;
  background-color: var(--lew-table-header-bgcolor);
}
.add-btn {
  padding: 10px 0px;
  width: 100%;
  cursor: pointer;
  transition: all var(--lew-form-transition-ease);
  background-color: var(--lew-table-header-bgcolor);
  border-top: var(--lew-table-border);
}
.add-btn:hover {
  background-color: var(--lew-table-header-bgcolor-hover);
}
.add-btn:active {
  background-color: var(--lew-table-header-bgcolor-active);
}
.add-btn.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.add-btn.disabled:hover,
.add-btn.disabled:active {
  background-color: var(--lew-bgcolor-2);
}
</style>
