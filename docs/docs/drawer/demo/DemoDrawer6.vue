<script setup lang="ts">
const visible = ref(false)
const nestedVisible = ref(false)
</script>

<template>
  <lew-flex gap="20px" x="start">
    <lew-drawer
      v-model:visible="visible"
      title="Nested Drawer Demo"
      close-by-esc
      close-on-click-overlay
      position="right"
      width="400px"
    >
      <lew-flex direction="y" gap="16">
        <div class="content main-content">
          <div class="content-header">
            <h3>Main Drawer Content</h3>
            <div class="badge">
              Primary
            </div>
          </div>
          <p>
            This is the main drawer. You can open a nested drawer from here.
          </p>
          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-icon">
                📋
              </div>
              <span>Nested functionality</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                ⚡
              </div>
              <span>Fast interaction</span>
            </div>
          </div>
        </div>

        <lew-button
          text="Open Nested Drawer"
          color="blue"
          size="medium"
          @click="nestedVisible = true"
        />
      </lew-flex>
    </lew-drawer>

    <lew-drawer
      v-model:visible="nestedVisible"
      title="Nested Drawer"
      close-by-esc
      close-on-click-overlay
      position="right"
      width="300px"
    >
      <lew-flex direction="y" gap="16">
        <div class="content nested-content">
          <div class="content-header">
            <h4>Nested Content</h4>
            <div class="badge secondary">
              Nested
            </div>
          </div>
          <p>This is a nested drawer opened from within another drawer.</p>
        </div>
      </lew-flex>
    </lew-drawer>

    <lew-button text="Open Main Drawer" size="medium" @click="visible = true" />
  </lew-flex>
</template>

<style scoped>
.content {
  padding: 20px;
  background: var(--lew-bg-color-1);
  border-radius: 12px;
  border: 1px solid var(--lew-border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.content:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.main-content {
  background: linear-gradient(135deg, var(--lew-bg-color-1) 0%, var(--lew-bg-color-2) 100%);
}

.nested-content {
  background: linear-gradient(135deg, var(--lew-bg-color-2) 0%, var(--lew-bg-color-3) 100%);
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.content h3 {
  margin: 0;
  color: var(--lew-text-color);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.content h4 {
  margin: 0;
  color: var(--lew-text-color);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.content p {
  margin: 0 0 16px 0;
  color: var(--lew-text-color-2);
  font-size: 14px;
  line-height: 1.6;
}

.badge {
  padding: 4px 12px;
  background: var(--lew-primary-color);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.secondary {
  background: var(--lew-success-color);
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--lew-bg-color-2);
  border-radius: 8px;
  border: 1px solid var(--lew-border-color);
}

.feature-icon {
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-item span {
  color: var(--lew-text-color);
  font-size: 14px;
  font-weight: 500;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.image-caption {
  color: var(--lew-text-color-2);
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}
</style>
