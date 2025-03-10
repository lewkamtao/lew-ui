<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import FormModal from './FormModal.vue'
import { inputTableProps } from './props'
import type { InputTableColumn } from './props'
import { any2px, getUniqueId } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { LewTable, LewButton, LewFlex, LewEmpty, LewMessage } from 'lew-ui'
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewMessage)
}
const modelValue: Ref<Array<any>> = defineModel({ required: true })

const setUseId = () => {
  ;(modelValue.value || []).forEach((e: any) => {
    if (!e.id) {
      e.id = getUniqueId()
    }
  })
}

setUseId()
watch(modelValue.value, () => {
  setUseId()
})

const props = defineProps(inputTableProps)

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
            fixed: 'right'
          }
        ]
      : [])
  ]
})

const formOptions = computed(() => {
  return (props.columns || []).map((e: any) => {
    const { as, title, field, props, required } = e
    return {
      label: title,
      field,
      as: as || 'input',
      required,
      props
    }
  })
})

const formModalRef = ref()
const edit = ({ row, index }: { row: any; index: number }) => {
  formModalRef.value.open({ row, index })
}
const del = ({ index }: { index: number }) => {
  if ((modelValue.value || []).length <= props.minRows) {
    LewMessage.warning('已达到最小行数限制，无法删除')
    return
  }
  LewDialog.error({
    title: '删除确认',
    okText: '删除',
    content: '你是否要删除该数据，此操作会立即生效，请谨慎操作！',
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      modelValue.value.splice(index, 1)
    }
  })
}
const add = () => {
  if ((modelValue.value || []).length >= props.maxRows) {
    LewMessage.warning('已达到最大行数限制，无法添加')
    return
  }
  let row: any = cloneDeep(props.defaultForm)
  if (props.autoUniqueId) {
    row['id'] = getUniqueId()
  }
  formModalRef.value.open({ row })
}

const addSuccess = ({ row }: { row: any }) => {
  if (!Array.isArray(modelValue.value)) {
    modelValue.value = [row]
  } else {
    modelValue.value.push(row)
  }
}

const editSuccess = ({ row, index }: { row: any; index: number }) => {
  modelValue.value.splice(index, 1, row)
}

const selectedKeys = ref<string[]>([])

const batchDelete = () => {
  if ((selectedKeys.value || []).length === 0) {
    LewMessage.warning('请先选择要删除的数据')
    return
  }
  LewDialog.error({
    title: '批量删除确认',
    okText: '删除',
    content: `你是否要删除选中的 ${(selectedKeys.value || []).length} 条数据，此操作会立即生效，请谨慎操作！`,
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      modelValue.value = modelValue.value.filter(
        (row) => !selectedKeys.value.includes(row.id)
      )
      selectedKeys.value = []
    }
  })
}
const clearAll = () => {
  LewDialog.error({
    title: '清空确认',
    okText: '清空',
    content: '你是否要清空所有数据，此操作会立即生效，请谨慎操作！',
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      modelValue.value = []
    }
  })
}

const checkUniqueFieldFn = (form: any) => {
  if (!props.uniqueField) {
    return true
  }
  const fieldValue = form[props.uniqueField]
  const vail = !modelValue.value.some(
    (item) => item[props.uniqueField] === fieldValue
  )
  if (!vail) {
    const label = formOptions.value.find(
      (e: any) => e.field === props.uniqueField
    )?.label
    LewMessage.warning(`该${label}已存在。请输入一个不重复的${label}。`)
    return false
  }
  return true
}

const sortRows = () => {
  // 实现排序逻辑
  LewMessage.info('该功能正在开发中，敬请期待')
}

const isMaxRowsReached = computed(
  () => (modelValue.value || []).length >= props.maxRows
)
const showHeaderAction = computed(
  () => props.batchDeletable || props.clearable || props.sortable
)

const getAddButtonStyle = computed(() => {
  const paddingMap = {
    small: '8px',
    medium: '10px',
    large: '12px'
  }
  const fontSizeMap = {
    small: 13,
    medium: 14,
    large: 16
  }
  return {
    padding: paddingMap[props.size],
    fontSize: fontSizeMap[props.size] + 'px'
  }
})
</script>

<template>
  <lew-flex
    x="start"
    y="start"
    direction="y"
    :style="{
      width: any2px(width)
    }"
  >
    <lew-table
      :size="size"
      :checkable="batchDeletable"
      :row-key="rowKey"
      multiple
      :columns="inputTableColumns as InputTableColumn[]"
      :data-source="modelValue"
      v-model:selectedKeys="selectedKeys"
    >
      <template #table-header>
        <lew-flex v-if="showHeaderAction" class="header-action">
          <lew-flex x="start">
            <lew-button
              v-if="batchDeletable"
              :disabled="(selectedKeys || []).length === 0"
              :size="size"
              type="text"
              color="gray"
              @click="batchDelete"
              >批量删除</lew-button
            >
          </lew-flex>
          <lew-flex x="end">
            <lew-button
              v-if="clearable && !minRows"
              :disabled="(modelValue || []).length === 0"
              :size="size"
              type="text"
              color="gray"
              @click="clearAll"
              >清空</lew-button
            >
            <lew-button
              v-if="sortable"
              :disabled="(modelValue || []).length === 0"
              :size="size"
              type="text"
              color="gray"
              @click="sortRows"
              >排序</lew-button
            >
          </lew-flex>
        </lew-flex>
      </template>
      <template #table-footer>
        <lew-flex direction="y" x="center" y="center">
          <lew-empty
            v-if="(modelValue || []).length === 0"
            description="暂无数据"
          ></lew-empty>
          <lew-flex
            x="center"
            y="center"
            v-if="addable"
            @click="add"
            class="add-btn"
            :class="{ disabled: isMaxRowsReached }"
            :style="getAddButtonStyle"
          >
            <Icon :size="16" type="plus"></Icon> 添加一条
          </lew-flex>
        </lew-flex>
      </template>
      <template #empty> </template>
      <template #action="{ row, index }">
        <lew-flex gap="5">
          <lew-button
            v-if="addable"
            type="text"
            color="gray"
            size="small"
            single-icon
            round
            @click="edit({ row, index })"
          >
            <Icon :size="14" type="edit-2" />
          </lew-button>
          <lew-button
            v-if="deletable"
            type="text"
            color="red"
            size="small"
            round
            single-icon
            @click="del({ index })"
          >
            <Icon :size="14" type="trash" />
          </lew-button>
        </lew-flex>
      </template>
    </lew-table>
    <FormModal
      ref="formModalRef"
      :options="formOptions"
      :size="size"
      :checkUniqueFieldFn="checkUniqueFieldFn"
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
