<script setup lang="ts">
import FormModal from './FormModal.vue'
import { inputTableProps } from './props'
import { any2px } from 'lew-ui/utils'

const modelValue: Ref<Array<any>> = defineModel({ required: true })

const props = defineProps(inputTableProps)

const inputTableColumns = computed(() => {
  return [
    ...props.columns,
    {
      title: '操作',
      width: 120,
      field: 'action',
      x: 'center',
      fixed: 'right'
    }
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
const addSuccess = ({ row }: { row: any }) => {
  modelValue.value.push(row)
}
const editSuccess = ({ row, index }: { row: any; index: number }) => {
  modelValue.value.splice(index, 1, row)
}
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
    <lew-table checkable :columns="inputTableColumns" :data-source="modelValue">
      <template #table-header>
        <lew-flex class="header-action">
          <lew-flex x="start">
            <lew-button size="small" type="text" color="blue">批量删除</lew-button>
          </lew-flex>
          <lew-flex x="end">
            <lew-button size="small" type="text" color="blue">排序</lew-button>
          </lew-flex>
        </lew-flex>
      </template>
      <template #table-footer>
        <lew-flex @click="formModalRef.open({})" class="add-btn"
          ><lew-icon size="16" type="plus"></lew-icon> 添加一条
        </lew-flex>
      </template>
      <template #empty> </template>
      <template #action="{ row, index }">
        <lew-button
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
</style>
