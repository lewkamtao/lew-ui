<script setup lang="ts">
import { h } from 'vue'

function content() {
  return h('div', {
    style: {
      padding: '8px',
      maxWidth: '260px',
      fontFamily: 'system-ui',
    },
  }, [
    h('h2', {
      style: {
        color: 'var(--lew-color-text-1)',
        margin: '0 0 8px',
        fontSize: '16px',
        fontWeight: '600',
      },
    }, 'Return Policy'),
    h('p', {
      style: {
        color: '#86868b',
        margin: '0 0 8px',
        fontSize: '13px',
        lineHeight: '1.3',
      },
    }, 'You can request a no-reason return within 14 days of receiving the product, provided the item is unused and in its original packaging.'),
    h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        marginTop: '12px',
      },
    }, [
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        },
      }, [
        h('span', {
          style: {
            background: '#f5f5f7',
            color: '#1d1d1f',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
          },
        }, '14 Days'),
        h('span', {
          style: {
            color: '#86868b',
            fontSize: '12px',
          },
        }, 'No-reason Return'),
      ]),
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        },
      }, [
        h('span', {
          style: {
            background: '#f5f5f7',
            color: '#1d1d1f',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
          },
        }, '30 Days'),
        h('span', {
          style: {
            color: '#86868b',
            fontSize: '12px',
          },
        }, 'Quality Issues Return'),
      ]),
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        },
      }, [
        h('span', {
          style: {
            background: '#f5f5f7',
            color: '#1d1d1f',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
          },
        }, '365 Days'),
        h('span', {
          style: {
            color: '#86868b',
            fontSize: '12px',
          },
        }, 'Warranty Service'),
      ]),
    ]),
  ])
}
</script>

<template>
  <lew-flex x="center" gap="50">
    <lew-tag
      v-tooltip="{
        content,
      }"
      oversize
      color="red"
      round
      text="Allow HTML"
    />
  </lew-flex>
</template>
