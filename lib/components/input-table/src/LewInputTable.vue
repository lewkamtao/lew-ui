<script setup lang="ts">
import FormModal from './FormModal.vue'
import { inputTableProps } from './props'
import { any2px, getUniqueId } from 'lew-ui/utils'

const modelValue: Ref<Array<any>> = defineModel({ required: true })

const props = defineProps(inputTableProps)

const inputTableColumns = computed(() => {
  return [
    ...props.columns,
    ...(props.deletable || props.addable
      ? [
          {
            title: '操作',
            width: 100,
            field: 'action',
            x: 'center',
            fixed: 'right'
          }
        ]
      : [])
  ]
})

const formOptions = computed(() => {
  return props.columns.map((e: any) => {
    const { as, title, field, props } = e
    return {
      label: title,
      field: field,
      as: as || 'input',
      props: props
    }
  })
})

const formModalRef = ref()
const edit = ({ row, index }: { row: any; index: number }) => {
  formModalRef.value.open({ row, index })
}
const del = ({ index }: { index: number }) => {
  if (modelValue.value.length <= props.minRows) {
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
  if (modelValue.value.length >= props.maxRows) {
    LewMessage.warning('已达到最大行数限制，无法添加')
    return
  }
  let row: any = {}
  if (props.autoUniqueId) {
    row['id'] = getUniqueId()
  }
  formModalRef.value.open({ row })
}
const addSuccess = ({ row }: { row: any }) => {
  modelValue.value.push(row)
}
const editSuccess = ({ row, index }: { row: any; index: number }) => {
  modelValue.value.splice(index, 1, row)
}

const selectedKeys = ref<string[]>([])

const batchDelete = () => {
  if (selectedKeys.value.length === 0) {
    LewMessage.warning('请先选择要删除的数据')
    return
  }
  LewDialog.error({
    title: '批量删除确认',
    okText: '删除',
    content: `你是否要删除选中的 ${selectedKeys.value.length} 条数据，此操作会立即生效，请谨慎操作！`,
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      modelValue.value = modelValue.value.filter((row) => !selectedKeys.value.includes(row.id))
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

const sortRows = () => {
  // 实现排序逻辑
  LewMessage.info('该功能正在开发中，敬请期待')
}

const isMaxRowsReached = computed(() => modelValue.value.length >= props.maxRows)
const showHeaderAction = computed(() => props.batchDeletable || props.clearable || props.sortable)
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
      :checkable="batchDeletable"
      :row-key="rowKey"
      multiple
      :columns="inputTableColumns"
      :data-source="modelValue"
      v-model:selectedKeys="selectedKeys"
    >
      <template #table-header>
        <lew-flex v-if="showHeaderAction" class="header-action">
          <lew-flex x="start">
            <lew-button
              v-if="batchDeletable"
              :disabled="selectedKeys.length === 0"
              size="small"
              type="text"
              color="gray"
              @click="batchDelete"
              >批量删除</lew-button
            >
          </lew-flex>
          <lew-flex x="end">
            <lew-button
              v-if="clearable && !minRows"
              :disabled="modelValue.length === 0"
              size="small"
              type="text"
              color="gray"
              @click="clearAll"
              >清空</lew-button
            >
            <lew-button
              v-if="sortable"
              :disabled="modelValue.length === 0"
              size="small"
              type="text"
              color="gray"
              @click="sortRows"
              >排序</lew-button
            >
          </lew-flex>
        </lew-flex>
      </template>
      <template #table-footer>
        <lew-flex direction="y">
          <lew-empty v-if="modelValue.length === 0" description="暂无数据"></lew-empty>
          <lew-flex
            v-if="addable"
            @click="add"
            class="add-btn"
            :class="{ disabled: isMaxRowsReached }"
          >
            <lew-icon size="16" type="plus"></lew-icon> 添加一条
          </lew-flex>
        </lew-flex>
      </template>
      <template #empty> </template>
      <template #action="{ row, index }">
        <lew-button
          v-if="addable"
          v-tooltip="{
            content: '编辑数据',
            trigger: 'mouseenter',
            delay: [500, 0]
          }"
          icon="edit-3"
          round
          size="small"
          type="text"
          @click="edit({ row, index })"
        />
        <lew-button
          v-if="deletable"
          v-tooltip="{
            content: '删除数据',
            trigger: 'mouseenter',
            delay: [500, 0]
          }"
          icon="trash"
          round
          size="small"
          color="red"
          type="text"
          @click="del({ index })"
        />
      </template>
    </lew-table>
    <FormModal
      :options="formOptions"
      ref="formModalRef"
      @addSuccess="addSuccess"
      @editSuccess="editSuccess"
    />
  </lew-flex>
</template>

<style lang="scss" scoped>
.header-action {
  background-color: var(--lew-table-header-bgColor);
  border-bottom: 1px var(--lew-bgcolor-3) solid;
  padding: 7px;
}
.add-btn {
  width: 100%;
  padding: 10px 0px;
  background-color: var(--lew-bgcolor-2);
  cursor: pointer;
  transition: var(--lew-form-transition-ease);
}
.add-btn:hover {
  background-color: var(--lew-bgcolor-3);
}
.add-btn:active {
  background-color: var(--lew-bgcolor-5);
}
.add-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.add-btn.disabled:hover,
.add-btn.disabled:active {
  background-color: var(--lew-bgcolor-2);
}
</style>
