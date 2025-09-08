<script setup lang="ts">
import type { LewFormOption } from 'lew-ui/types'
import { LewForm } from 'lew-ui'
import { ref } from 'vue'

const formRef = ref()
const formData = ref({})

// 表单配置，包含联动控制
const formOptions: LewFormOption[] = [
  {
    label: '用户类型',
    field: 'userType',
    as: 'select',
    props: {
      options: [
        { label: '普通用户', value: 'normal' },
        { label: 'VIP用户', value: 'vip' },
        { label: '管理员', value: 'admin' },
      ],
    },
  },
  {
    label: 'VIP等级',
    field: 'vipLevel',
    as: 'select',
    // 只有当用户类型为VIP时才显示
    visible: formData => formData.userType === 'vip',
    props: {
      options: [
        { label: '青铜', value: 'bronze' },
        { label: '白银', value: 'silver' },
        { label: '黄金', value: 'gold' },
        { label: '钻石', value: 'diamond' },
      ],
    },
  },
  {
    label: '管理员权限',
    field: 'adminPermissions',
    as: 'checkbox-group',
    // 只有当用户类型为管理员时才显示
    visible: formData => formData.userType === 'admin',
    props: {
      options: [
        { label: '用户管理', value: 'user_manage' },
        { label: '系统设置', value: 'system_config' },
        { label: '数据统计', value: 'data_stats' },
      ],
    },
  },
  {
    label: '是否启用',
    field: 'enabled',
    as: 'switch',
    // 普通用户时禁用
    disabled: formData => formData.userType === 'normal',
  },
  {
    label: '备注',
    field: 'remark',
    as: 'textarea',
    // 根据用户类型动态设置占位符
    props: formData => ({
      placeholder: formData.userType === 'admin'
        ? '请输入管理员备注...'
        : formData.userType === 'vip'
          ? '请输入VIP用户备注...'
          : '请输入备注...',
    }),
  },
]

function handleFormChange(data: any) {
  formData.value = data
}
</script>

<template>
  <div class="demo-form-linkage">
    <h3>表单联动控制示例</h3>
    <LewForm
      ref="formRef"
      :options="formOptions"
      @change="handleFormChange"
    />
    <div class="form-data">
      <h4>表单数据：</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.demo-form-linkage {
  padding: 20px;
}

.form-data {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.form-data pre {
  margin: 0;
  font-size: 12px;
  color: #666;
}
</style>
