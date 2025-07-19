<script setup lang="ts">
import type { LewSize } from 'lew-ui'
import { LewForm, LewMessage, LewModal, locale } from 'lew-ui'
import { cloneDeep } from 'lodash-es'

const props = defineProps({
  options: {
    type: Object,
  },
  size: {
    type: String,
    default: '',
  },
  checkUniqueFieldFn: {
    type: Function,
    default: () => true,
  },
})
const emit = defineEmits(['addSuccess', 'editSuccess'])
const visible = ref(false)
const formRef = ref()
const form = ref({})
const editIndex = ref(-1)
const id = ref('')

function open({ row = {}, index = -1 }: { row: any, index: number }) {
  visible.value = true
  editIndex.value = index
  id.value = row.id
  form.value = cloneDeep(row)
}

function ok() {
  formRef.value.validate().then((res: boolean) => {
    if (res) {
      if (editIndex.value >= 0) {
        emit('editSuccess', {
          row: { ...formRef.value.getForm(), id: id.value },
          index: editIndex.value,
        })
      }
      else {
        const _form = formRef.value.getForm()

        if (!props.checkUniqueFieldFn(_form)) {
          return
        }

        emit('addSuccess', { row: { ..._form, id: id.value } })
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
    :close-button-props="
      {
        request: () => {
          visible = false
        },
      } as any
    "
    :ok-button-props="
      {
        request: ok,
      } as any
    "
    :title="`${editIndex >= 0 ? locale.t('inputTable.editTitle') : locale.t('inputTable.modelTitle')}`"
  >
    <div class="lew-form-modal lew-scrollbar">
      <LewForm
        ref="formRef"
        :size="size as LewSize"
        width="350"
        :options="options as Record<string, any>[]"
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
