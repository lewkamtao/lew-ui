<script setup lang="ts">
import type { LewSize } from 'lew-ui'
import { LewForm, LewMessage, LewModal, locale } from 'lew-ui'
import { cloneDeep } from 'lodash-es'
import { formModalProps } from './props'

const props = defineProps(formModalProps)

const emit = defineEmits(['addSuccess', 'editSuccess'])
const visible = ref(false)
const formRef = ref()
const form = ref({})
const isEditing = ref(false)
const originalRowId = ref('')

function open({
  row = {},
  isEditing: isEditingParam,
}: {
  row: any
  isEditing?: boolean
}) {
  visible.value = true
  // 通过传入的isEditing参数来判断是编辑还是新增
  isEditing.value = isEditingParam || false
  originalRowId.value = row[props.rowKey] || ''
  form.value = cloneDeep(row)
}

function ok() {
  formRef.value.validate().then((res: boolean) => {
    if (res) {
      const formData = formRef.value.getForm()
      // 无论是编辑还是新增，都需要检查唯一性
      if (
        !props.checkUniqueFieldFn(
          formData,
          isEditing.value,
          originalRowId.value,
        )
      ) {
        return
      }

      if (isEditing.value) {
        // 编辑模式：保持原有的rowKey
        emit('editSuccess', {
          row: { ...formData, [props.rowKey]: originalRowId.value },
        })
      }
      else {
        // 新增模式：不设置id，让setUseId函数自动生成
        emit('addSuccess', {
          row: formData,
        })
      }
      visible.value = false
    }
    else {
      LewMessage.warning('请根据提示填写表单')
    }
  })
}

function formMounted() {
  formRef.value.setForm(form.value)
}

defineExpose({ open })
</script>

<template>
  <LewModal
    v-model:visible="visible"
    :close-button-props="{
      request: () => {
        visible = false
      },
    } as any
    "
    :ok-button-props="{
      request: ok,
    } as any
    "
    :title="`${
      isEditing
        ? locale.t('inputTable.editTitle')
        : locale.t('inputTable.modelTitle')
    }`"
  >
    <div class="lew-form-modal lew-scrollbar">
      <LewForm
        ref="formRef"
        :size="size as LewSize"
        width="350"
        :options="options"
        @mounted="formMounted"
      />
    </div>
  </LewModal>
</template>

<style lang="scss" scoped>
.lew-form-modal {
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 80vh;
}

.lew-form-modal-footer {
  padding: 5px 15px;
}
</style>
