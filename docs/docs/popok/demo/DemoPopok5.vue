<script setup lang="ts">
import { LewButton } from 'lew-ui'
import { h } from 'vue'

function onCancel() {
  LewMessage.info('Cancelled')
}
function onOk() {
  LewMessage.success('Confirmed')
}

const content = h(
  'div',
  {
    style: {
      color: '#1d1d1f',
      padding: '12px 0',
      fontSize: '15px',
      lineHeight: '1.6',
    },
  },
  [
    h(
      'ul',
      { style: { margin: '0 0 8px 0', paddingLeft: '20px', color: '#6e6e73' } },
      [
        h('li', null, 'All data will be permanently removed.'),
        h('li', null, 'This action affects all related information.'),
        h('li', null, ['Please make sure you have a backup.']),
      ],
    ),
    h(
      'div',
      { style: { color: '#d93026', fontWeight: 500, marginTop: '8px' } },
      'This action is irreversible.',
    ),
  ],
)
</script>

<template>
  <lew-popok
    width="400px"
    title="Delete Confirmation"
    type="error"
    :content="content"
    placement="bottom-start"
    :footer-buttons="[
      { props: { type: 'text', color: 'gray', size: 'small', text: 'Cancel', request: onCancel } },
      { props: { type: 'fill', color: 'red', size: 'small', text: 'Delete' } },
    ]"
    trigger="hover"
    @ok="onOk"
  >
    <LewButton text="Hover to trigger" type="text" color="red" />
  </lew-popok>
</template>
