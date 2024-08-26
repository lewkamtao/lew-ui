<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
defineProps({
  options: {
    type: Object
  }
})

const visible = ref(false)
const formRef = ref()
const form = ref({})
const editIndex = ref(-1)
const open = ({ row = {}, index = -1 }: { row: any; index: number }) => {
  visible.value = true
  if (index >= 0) {
    editIndex.value = index
    form.value = cloneDeep(row)
  }
}
const emit = defineEmits(['addSuccess', 'editSuccess'])
const ok = () => {
  formRef.value.validate().then((res: boolean) => {
    if (res) {
      if (editIndex.value >= 0) {
        emit('editSuccess', { row: formRef.value.getForm(), index: editIndex.value })
      } else {
        emit('addSuccess', { row: formRef.value.getForm() })
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
.footer {
  padding: 5px 15px;
}
.form-modal {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80vh;
}
</style>
