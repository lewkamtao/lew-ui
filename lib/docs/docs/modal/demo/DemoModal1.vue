<script setup lang="ts">
const visible = ref(false)
const visible2 = ref(false)
</script>

<template>
  <lew-flex x="start">
    <lew-button @click="visible = true">Modal</lew-button>
  </lew-flex>
  <lew-modal
    v-model:visible="visible"
    closeOnClickOverlay
    closeByEsc
    width="450px"
    title="About Lew-UI"
    @ok="visible = false"
    @cancel="visible = false"
  >
    <div class="modal-body">
      <lew-image
        previewGroupKey="cover"
        object-position="top"
        :width="150"
        :height="150"
        src="https://app.tngeek.com/api_sso/open/file/b4c64ae_cat-8321993_1280.webp"
      />
      <div style="margin-top: 20px">
        A beautiful component library based on vue3
      </div>
      <div style="margin-top: 20px">
        A beautiful component library based on vue3
      </div>
      <lew-flex x="start">
        <lew-button @click="visible2 = true">Modal</lew-button>
      </lew-flex>
      <lew-modal
        v-model:visible="visible2"
        closeOnClickOverlay
        closeByEsc
        width="350px"
        title="About Lew-UI"
        @ok="visible2 = false"
        @cancel="visible2 = false"
      >
        <div class="modal-body">
          <lew-image
            previewGroupKey="cover"
            object-position="top"
            :width="150"
            :height="150"
            src="https://app.tngeek.com/api_sso/open/file/b4c64ae_cat-8321993_1280.webp"
          />
          <div style="margin-top: 20px">
            A beautiful component library based on vue3
          </div>
        </div>
      </lew-modal>
    </div>
  </lew-modal>
</template>

<style lang="scss" scoped>
.modal-body {
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 18px;
  font-weight: bolder;
}
</style>
