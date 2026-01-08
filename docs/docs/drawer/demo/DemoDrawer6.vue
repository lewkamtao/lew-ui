<script setup lang="ts">
import type { LewDrawerPosition } from 'lew-ui/types'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const position = ref<LewDrawerPosition>('right')

const positionOptions = [
  { label: 'Right', value: 'right' },
  { label: 'Left', value: 'left' },
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
]

function openDrawer1() {
  visible1.value = true
  visible2.value = false
  visible3.value = false
}
</script>

<template>
  <lew-flex direction="y" gap="20px">
    <lew-tabs v-model="position" :options="positionOptions" type="line" />

    <lew-button text="Open First Drawer" size="medium" @click="openDrawer1" />

    <!-- 第一层抽屉 -->
    <lew-drawer
      v-model:visible="visible1"
      title="First Drawer"
      close-by-esc
      close-on-click-overlay
      :position="position"
      :width="position === 'left' || position === 'right' ? '500px' : '100vw'"
      :height="position === 'top' || position === 'bottom' ? '400px' : '100vh'"
    >
      <lew-flex direction="y" gap="16" style="padding: 20px">
        <div class="drawer-content">
          <h3>First Layer</h3>
          <p>
            This is the first drawer. Click the button below to open the second
            drawer.
          </p>
        </div>

        <lew-button
          text="Open Second Drawer"
          color="blue"
          size="medium"
          @click="visible2 = true"
        />
      </lew-flex>
    </lew-drawer>

    <!-- 第二层抽屉 -->
    <lew-drawer
      v-model:visible="visible2"
      title="Second Drawer"
      close-by-esc
      close-on-click-overlay
      :position="position"
      :width="position === 'left' || position === 'right' ? '450px' : '100vw'"
      :height="position === 'top' || position === 'bottom' ? '350px' : '100vh'"
    >
      <lew-flex direction="y" gap="16" style="padding: 20px">
        <div class="drawer-content">
          <h3>Second Layer</h3>
          <p>
            This is the second drawer. Notice the first drawer is partially
            visible (100px).
          </p>
        </div>

        <lew-button
          text="Open Third Drawer"
          color="green"
          size="medium"
          @click="visible3 = true"
        />
      </lew-flex>
    </lew-drawer>

    <!-- 第三层抽屉 -->
    <lew-drawer
      v-model:visible="visible3"
      title="Third Drawer"
      close-by-esc
      close-on-click-overlay
      :position="position"
      :width="position === 'left' || position === 'right' ? '400px' : '100vw'"
      :height="position === 'top' || position === 'bottom' ? '300px' : '100vh'"
    >
      <lew-flex direction="y" gap="16" style="padding: 20px">
        <div class="drawer-content">
          <h3>Third Layer</h3>
          <p>
            This is the third drawer. Both previous drawers are visible with
            100px each.
          </p>
        </div>
      </lew-flex>
    </lew-drawer>
  </lew-flex>
</template>

<style scoped>
.drawer-content {
  padding: 20px;
  background: var(--lew-bgcolor-2);
  border-radius: 8px;
}

.drawer-content h3 {
  margin: 0 0 12px 0;
  color: var(--lew-text-color-1);
  font-size: 18px;
  font-weight: 600;
}

.drawer-content p {
  margin: 0;
  color: var(--lew-text-color-2);
  font-size: 14px;
  line-height: 1.6;
}
</style>
