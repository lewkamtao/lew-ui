<script setup lang="ts">
async function onLater() {}

async function onSave() {
  await new Promise(r => setTimeout(r, 300))
  LewMessage.success({ content: 'Saved' })
}
</script>

<template>
  <lew-flex x="start">
    <lew-popok
      type="warning"
      title="Save changes?"
      content="footerButtons controls multiple actions with different LewButton props (e.g. request)."
      trigger="click"
      placement="top"
      :footer-buttons="[
        {
          props: { text: 'Later', type: 'text', color: 'gray', request: onLater },
        },
        {
          props: { text: 'Save', type: 'fill', color: 'primary', request: onSave },
        },
      ]"
    >
      <lew-button type="light">
        Edit with custom footer
      </lew-button>
    </lew-popok>
  </lew-flex>
</template>
