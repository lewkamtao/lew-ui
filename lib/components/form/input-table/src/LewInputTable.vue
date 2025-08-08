<script setup lang="ts">
import type { LewInputTableColumn } from 'lew-ui/types'
import {
  LewButton,
  LewDialog,
  LewFlex,
  LewMessage,
  LewTable,
  LewTooltip,
  locale,
} from 'lew-ui'

import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, getUniqueId } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import FormModal from './FormModal.vue'
import { inputTableProps } from './props'

// 扩展LewTable类型以支持drag-sort事件
declare module 'vue' {
  interface ComponentCustomEvents {
    'drag-sort': [data: any[]]
  }
}

const props = defineProps(inputTableProps)
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const modelValue: Ref<Array<any>> = defineModel({ required: true })

function setUseId() {
  (modelValue.value || []).forEach((e: any) => {
    if (!e.id) {
      e.id = getUniqueId()
    }
  })
}

setUseId()
watch(
  modelValue.value,
  () => {
    setUseId()
  },
  { deep: true },
)

// 缓存列配置，避免重复计算
const inputTableColumns: ComputedRef<LewInputTableColumn[]> = computed(() => {
  const actionColumn
    = props.deletable || props.addable
      ? [
          {
            title: '操作',
            width: 90,
            field: 'action',
            x: 'center',
            fixed: 'right',
            as: 'action',
          },
        ]
      : []

  return [...props.columns, ...actionColumn]
})

// 缓存表单选项配置
const formOptions = computed(() => {
  return props.columns.map((column: any) => {
    const { as, title, field, props: columnProps, required } = column
    return {
      label: title,
      field,
      as: as || 'input',
      required,
      props: columnProps,
    }
  })
})

// 缓存样式计算
const styleConfig = computed(() => {
  const { size } = props

  const paddingMap = {
    small: '8px',
    medium: '10px',
    large: '12px',
  }

  const fontSizeMap = {
    small: 13,
    medium: 14,
    large: 16,
  }

  const iconSizeMap = {
    small: '24px',
    medium: '26px',
    large: '28px',
  }

  return {
    addButtonStyle: {
      padding: paddingMap[size],
      fontSize: `${fontSizeMap[size]}px`,
    },
    iconStyle: {
      width: iconSizeMap[size],
      height: iconSizeMap[size],
    },
    iconSize: fontSizeMap[size],
  }
})

const formModalRef = ref()

// 修复排序后编辑问题：使用rowKey而不是index来标识行
function edit({ row }: { row: any, index: number }) {
  formModalRef.value.open({ row })
}

function del({ row }: { row: any, index: number }) {
  if ((modelValue.value || []).length <= props.minRows) {
    LewMessage.warning(locale.t('inputTable.minRows'))
    return
  }

  LewDialog.error({
    title: locale.t('inputTable.deleteConfirm'),
    okText: locale.t('inputTable.delete'),
    cancelText: locale.t('inputTable.cancel'),
    content: locale.t('inputTable.deleteConfirmContent'),
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      // 通过rowKey找到正确的行进行删除
      const rowId = row[props.rowKey]
      const actualIndex = modelValue.value.findIndex(
        item => item[props.rowKey] === rowId,
      )
      if (actualIndex !== -1) {
        modelValue.value.splice(actualIndex, 1)
      }
      return Promise.resolve(true)
    },
  })
}

function add() {
  if ((modelValue.value || []).length >= props.maxRows) {
    LewMessage.warning(locale.t('inputTable.maxRows'))
    return
  }

  formModalRef.value.open({})
}

function addSuccess({ row }: { row: any }) {
  if (!Array.isArray(modelValue.value)) {
    modelValue.value = [row]
  }
  else {
    modelValue.value.push(row)
    modelValue.value = cloneDeep(modelValue.value)
  }
}

// 修复编辑成功逻辑：通过rowKey找到正确的行进行更新
function editSuccess({ row }: { row: any }) {
  const rowId = row[props.rowKey]
  const actualIndex = modelValue.value.findIndex(item => item[props.rowKey] === rowId)
  if (actualIndex !== -1) {
    modelValue.value.splice(actualIndex, 1, row)
  }
}

const selectedKeys = ref<string[]>([])

// 处理拖拽排序事件，同步更新modelValue的顺序
function dragSort(sortedDataSource: any[]) {
  // 移除内部的_lew_table_tr_id字段，保持数据纯净
  const cleanedData = sortedDataSource.map((item) => {
    const { _lew_table_tr_id, ...cleanItem } = item
    return cleanItem
  })

  // 更新modelValue为排序后的数据
  modelValue.value = cleanedData
}

function checkUniqueFieldFn(form: any) {
  if (!props.uniqueField) {
    return true
  }

  const fieldValue = form[props.uniqueField]
  const currentRowId = form[props.rowKey]

  // 编辑时需要排除当前行
  const isDuplicate = modelValue.value.some(
    item =>
      item[props.uniqueField] === fieldValue && item[props.rowKey] !== currentRowId,
  )

  if (isDuplicate) {
    const label = formOptions.value.find(
      (option: any) => option.field === props.uniqueField,
    )?.label
    LewMessage.warning(locale.t('inputTable.uniqueFieldExist', { label }))
    return false
  }

  return true
}

const isMaxRowsReached = computed(() => (modelValue.value || []).length >= props.maxRows)
</script>

<template>
  <LewFlex
    x="start"
    y="start"
    direction="y"
    :style="{
      width: any2px(width),
    }"
  >
    <LewTable
      v-model:selected-keys="selectedKeys"
      :size="size"
      :sortable="sortable"
      :row-key="rowKey"
      :sort-tooltip-custom-render="sortTooltipCustomRender"
      multiple
      :columns="inputTableColumns"
      :data-source="modelValue"
      @drag-sort="dragSort"
    >
      <template #table-header>
        <slot name="table-header" />
      </template>
      <template #table-footer>
        <LewFlex direction="y" x="center" y="center">
          <LewFlex
            v-if="addable"
            x="center"
            y="center"
            class="add-btn"
            :class="{ disabled: isMaxRowsReached }"
            :style="styleConfig.addButtonStyle"
            @click="add"
          >
            <CommonIcon :size="styleConfig.iconSize" type="plus" />
            {{ locale.t("inputTable.addText") }}
          </LewFlex>
        </LewFlex>
      </template>
      <template #action="{ row, index }">
        <LewFlex gap="5px" x="center">
          <LewButton
            v-if="addable"
            type="text"
            color="gray"
            :style="styleConfig.iconStyle"
            size="small"
            single-icon
            round
            @click="edit({ row, index })"
          >
            <CommonIcon :size="styleConfig.iconSize" type="edit-2" />
          </LewButton>
          <LewButton
            v-if="deletable"
            type="text"
            color="red"
            size="small"
            :style="styleConfig.iconStyle"
            round
            single-icon
            @click="del({ row, index })"
          >
            <CommonIcon :size="styleConfig.iconSize" type="trash" />
          </LewButton>
        </LewFlex>
      </template>
    </LewTable>
    <FormModal
      ref="formModalRef"
      :options="formOptions"
      :size="size"
      :check-unique-field-fn="checkUniqueFieldFn"
      :ok-text="locale.t('inputTable.save')"
      @add-success="addSuccess"
      @edit-success="editSuccess"
    />
  </LewFlex>
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
