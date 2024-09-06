<script setup lang="ts">
import { cloneDeep } from 'lodash-es'

const visible = ref(false)
const formRef = ref()
const form = ref({})
const editIndex = ref(-1)
const id = ref('')

defineProps({
  options: {
    type: Object
  }
})

const emit = defineEmits(['addSuccess', 'editSuccess'])

const open = ({ row = {}, index = -1 }: { row: any; index: number }) => {
  visible.value = true
  editIndex.value = index
  id.value = row.id
  if (index >= 0) {
    form.value = cloneDeep(row)
  } else {
    form.value = {}
  }
}

const ok = () => {
  formRef.value.validate().then((res: boolean) => {
    if (res) {
      if (editIndex.value >= 0) {
        emit('editSuccess', {
          row: { ...formRef.value.getForm(), id: id.value },
          index: editIndex.value
        })
      } else {
        emit('addSuccess', { row: { ...formRef.value.getForm(), id: id.value } })
      }
      visible.value = false
    } else {
      LewMessage.error('请根据提示填写表单')
    }
  })
}

const formMounted = () => {
  formRef.value.setForm(form.value)
}

defineExpose({ open })
</script>

<template>
  <lew-modal
    v-model:visible="visible"
    :cancelProps="{
      text: '取消'
    }"
    :okProps="{
      text: '保存'
    }"
    @ok="ok"
    @cancel="visible = false"
    :title="`${editIndex >= 0 ? '编辑' : '新增'}数据`"
  >
    <div class="form-modal lew-scrollbar">
      <lew-form @mounted="formMounted" ref="formRef" width="350" :options="options" />
    </div>
  </lew-modal>
</template>

<style lang="scss" scoped>
.form-modal {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80vh;
}

.footer {
  padding: 5px 15px;
}
</style>
