<script setup lang="ts">
// 控制各层级弹窗的显示状态
const mainModalVisible = ref(false)
const detailDrawerVisible = ref(false)
const editModalVisible = ref(false)
const settingsDrawerVisible = ref(false)
const confirmModalVisible = ref(false)

// 当前选中的用户
const selectedUser = ref<any>(null)

// 模拟用户数据
const users = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
    avatar: '👨‍💼',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: 'active',
    avatar: '👩‍💻',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '访客',
    status: 'inactive',
    avatar: '👨‍🎨',
  },
])

// 编辑表单数据
const editForm = ref({
  name: '',
  email: '',
  role: '',
})

// 打开用户详情抽屉
function openUserDetail(user: any) {
  selectedUser.value = user
  editForm.value = { ...user }
  detailDrawerVisible.value = true
}

// 打开编辑对话框
function openEditModal() {
  editModalVisible.value = true
}

// 保存编辑
function handleSaveEdit() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 更新用户数据
      const index = users.value.findIndex(u => u.id === selectedUser.value.id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...editForm.value }
        selectedUser.value = users.value[index]
      }
      editModalVisible.value = false
      resolve(true)
    }, 800)
  })
}

// 打开设置抽屉
function openSettingsDrawer() {
  settingsDrawerVisible.value = true
}

// 打开确认对话框
function openConfirmModal() {
  confirmModalVisible.value = true
}

// 确认操作
function handleConfirm() {
  return new Promise((resolve) => {
    setTimeout(() => {
      confirmModalVisible.value = false
      settingsDrawerVisible.value = false
      resolve(true)
    }, 500)
  })
}

// 关闭所有弹窗
function closeAll() {
  confirmModalVisible.value = false
  settingsDrawerVisible.value = false
  editModalVisible.value = false
  detailDrawerVisible.value = false
  mainModalVisible.value = false
}
</script>

<template>
  <lew-flex x="start">
    <lew-button type="light" @click="mainModalVisible = true">
      打开用户管理
    </lew-button>
  </lew-flex>

  <!-- 第1层：主对话框 - 用户管理 -->
  <lew-modal
    v-model:visible="mainModalVisible"
    close-on-click-overlay
    close-by-esc
    width="600px"
    title="用户管理"
  >
    <div class="modal-body">
      <div class="user-list">
        <div
          v-for="user in users"
          :key="user.id"
          class="user-item"
          @click="openUserDetail(user)"
        >
          <div class="user-avatar">
            {{ user.avatar }}
          </div>
          <div class="user-info">
            <div class="user-name">
              {{ user.name }}
            </div>
            <div class="user-email">
              {{ user.email }}
            </div>
          </div>
          <div class="user-role">
            <span class="role-tag" :class="user.role">{{ user.role }}</span>
          </div>
          <div class="user-status">
            <span class="status-dot" :class="user.status" />
          </div>
        </div>
      </div>
      <div class="modal-tip">
        💡 点击用户可查看详情
      </div>
    </div>
  </lew-modal>

  <!-- 第2层：抽屉 - 用户详情 -->
  <lew-drawer
    v-model:visible="detailDrawerVisible"
    title="用户详情"
    position="right"
    width="400px"
    close-on-click-overlay
  >
    <div v-if="selectedUser" class="drawer-body">
      <div class="detail-header">
        <div class="detail-avatar">
          {{ selectedUser.avatar }}
        </div>
        <div class="detail-basic">
          <h3>{{ selectedUser.name }}</h3>
          <p>{{ selectedUser.email }}</p>
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-item">
          <span class="label">角色</span>
          <span class="value">{{ selectedUser.role }}</span>
        </div>
        <div class="detail-item">
          <span class="label">状态</span>
          <span class="value">
            <span class="status-dot" :class="selectedUser.status" />
            {{ selectedUser.status === 'active' ? '在线' : '离线' }}
          </span>
        </div>
        <div class="detail-item">
          <span class="label">用户ID</span>
          <span class="value">{{ selectedUser.id }}</span>
        </div>
      </div>

      <lew-flex gap="10" class="action-buttons">
        <lew-button type="light" @click="openEditModal">
          编辑信息
        </lew-button>
        <lew-button type="light" color="orange" @click="openSettingsDrawer">
          权限设置
        </lew-button>
      </lew-flex>
    </div>
  </lew-drawer>

  <!-- 第3层：对话框 - 编辑用户 -->
  <lew-modal
    v-model:visible="editModalVisible"
    title="编辑用户信息"
    width="400px"
    close-on-click-overlay
    close-by-esc
    :footer-buttons="[
      { props: { type: 'fill', color: 'primary', size: 'small', text: '保存', request: handleSaveEdit } },
    ]"
  >
    <div class="edit-form">
      <div class="form-item">
        <label>姓名</label>
        <lew-input v-model="editForm.name" placeholder="请输入姓名" />
      </div>
      <div class="form-item">
        <label>邮箱</label>
        <lew-input v-model="editForm.email" placeholder="请输入邮箱" />
      </div>
      <div class="form-item">
        <label>角色</label>
        <lew-select
          v-model="editForm.role"
          :options="[
            { label: '管理员', value: '管理员' },
            { label: '编辑', value: '编辑' },
            { label: '访客', value: '访客' },
          ]"
        />
      </div>
    </div>
  </lew-modal>

  <!-- 第3层：抽屉 - 权限设置 -->
  <lew-drawer
    v-model:visible="settingsDrawerVisible"
    title="权限设置"
    position="right"
    width="350px"
  >
    <div class="settings-body">
      <div class="settings-section">
        <h4>基础权限</h4>
        <div class="setting-item">
          <span>查看数据</span>
          <lew-switch :model-value="true" />
        </div>
        <div class="setting-item">
          <span>编辑数据</span>
          <lew-switch :model-value="true" />
        </div>
        <div class="setting-item">
          <span>删除数据</span>
          <lew-switch :model-value="false" />
        </div>
      </div>

      <div class="settings-section">
        <h4>高级权限</h4>
        <div class="setting-item">
          <span>管理用户</span>
          <lew-switch :model-value="false" />
        </div>
        <div class="setting-item">
          <span>系统配置</span>
          <lew-switch :model-value="false" />
        </div>
      </div>

      <lew-flex x="start" class="settings-actions">
        <lew-button color="error" type="light" @click="openConfirmModal">
          重置权限
        </lew-button>
      </lew-flex>
    </div>
  </lew-drawer>

  <!-- 第4层：对话框 - 确认操作 -->
  <lew-modal
    v-model:visible="confirmModalVisible"
    title="确认操作"
    width="350px"
    :footer-buttons="[
      { props: { type: 'fill', color: 'error', size: 'small', text: '确认', request: handleConfirm } },
    ]"
  >
    <div class="confirm-body">
      <div class="confirm-icon">
        ⚠️
      </div>
      <p>确定要重置该用户的所有权限吗？</p>
      <p class="confirm-tip">
        此操作不可撤销，请谨慎操作。
      </p>
    </div>
  </lew-modal>

  <!-- 快捷操作提示 -->
  <div
    v-if="mainModalVisible || detailDrawerVisible || editModalVisible || settingsDrawerVisible || confirmModalVisible"
    class="float-actions"
  >
    <lew-button size="small" color="error" type="light" @click="closeAll">
      关闭所有
    </lew-button>
  </div>
</template>

<style lang="scss" scoped>
.modal-body {
  padding: 20px;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--lew-bgcolor-1);
  border-radius: var(--lew-border-radius-medium);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--lew-bgcolor-2);
    transform: translateX(4px);
  }
}

.user-avatar {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lew-bgcolor-3);
  border-radius: 50%;
}

.user-info {
  flex: 1;

  .user-name {
    font-weight: 600;
    font-size: 15px;
    color: var(--lew-text-color-0);
  }

  .user-email {
    font-size: 13px;
    color: var(--lew-text-color-2);
    margin-top: 4px;
  }
}

.role-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;

  &.管理员 {
    background: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
  }

  &.编辑 {
    background: var(--lew-color-success-light);
    color: var(--lew-color-success-dark);
  }

  &.访客 {
    background: var(--lew-color-warning-light);
    color: var(--lew-color-warning-dark);
  }
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;

  &.active {
    background: var(--lew-color-success);
    box-shadow: 0 0 8px var(--lew-color-success);
  }

  &.inactive {
    background: var(--lew-color-normal);
  }
}

.modal-tip {
  margin-top: 16px;
  padding: 12px;
  background: var(--lew-bgcolor-2);
  border-radius: var(--lew-border-radius-small);
  font-size: 13px;
  color: var(--lew-text-color-2);
  text-align: center;
}

// 抽屉内容样式
.drawer-body {
  padding: 20px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--lew-bgcolor-3);

  .detail-avatar {
    font-size: 48px;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--lew-bgcolor-2);
    border-radius: 50%;
  }

  .detail-basic {
    h3 {
      margin: 0;
      font-size: 20px;
      color: var(--lew-text-color-0);
    }

    p {
      margin: 8px 0 0;
      color: var(--lew-text-color-2);
    }
  }
}

.detail-section {
  padding: 20px 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--lew-bgcolor-2);

  .label {
    color: var(--lew-text-color-2);
  }

  .value {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.action-buttons {
  padding-top: 20px;
}

// 编辑表单样式
.edit-form {
  padding: 20px;
}

.form-item {
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--lew-text-color-1);
  }
}

// 设置样式
.settings-body {
  padding: 20px;
}

.settings-section {
  margin-bottom: 24px;

  h4 {
    margin: 0 0 16px;
    color: var(--lew-text-color-1);
    font-size: 14px;
    font-weight: 600;
  }
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--lew-bgcolor-2);

  span {
    color: var(--lew-text-color-2);
  }
}

.settings-actions {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--lew-bgcolor-3);
}

// 确认对话框样式
.confirm-body {
  padding: 20px;
  text-align: center;

  .confirm-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  p {
    margin: 8px 0;
    color: var(--lew-text-color-1);
  }

  .confirm-tip {
    font-size: 13px;
    color: var(--lew-color-error);
  }
}

// 浮动操作按钮
.float-actions {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
