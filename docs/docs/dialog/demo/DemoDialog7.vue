<script setup lang="ts">
function open() {
  LewDialog.info({
    title: 'Choose an action',
    content:
      'Use footerButtons to control count and LewButton props. Returning false from props.request keeps the dialog open.',
    footerButtons: [
      {
        props: {
          text: 'Keep open',
          type: 'light',
          color: 'gray',
          request: async () => {
            LewMessage.warning({ content: 'Dialog stays open (request returned false)' })
            return false
          },
        },
      },
      {
        props: {
          text: 'Later',
          type: 'text',
          color: 'gray',
          request: async () => {},
        },
      },
      {
        props: {
          text: 'Done',
          type: 'fill',
          color: 'primary',
          request: async () => {
            LewMessage.success({ content: 'Closed after action' })
          },
        },
      },
    ],
  })
}
</script>

<template>
  <lew-flex x="start">
    <lew-button type="ghost" text="Dynamic footer buttons" @click="open" />
  </lew-flex>
</template>
