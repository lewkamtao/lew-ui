<script setup lang="ts">
import { object2class } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { alertProps } from './props'

const props = defineProps(alertProps)

const emit = defineEmits(['close'])

const alertClassName = computed(() => {
  const { type } = props
  return object2class('lew-alert', { type })
})
</script>

<template>
  <div class="lew-alert" :class="alertClassName">
    <Icon dark :size="18" :type />
    <div class="lew-alert-message">
      <div v-if="$slots.title" class="lew-alert-title">
        <slot name="title" />
      </div>
      <div v-else class="lew-alert-title">
        {{ title }}
      </div>

      <div v-if="$slots.content" class="lew-alert-content">
        <slot name="content" />
      </div>
      <div v-else-if="content" class="lew-alert-content">
        {{ content }}
      </div>

      <div v-if="$slots.footer" class="lew-alert-footer">
        <slot name="footer" />
      </div>
    </div>
    <Icon
      v-if="closeable"
      class="lew-form-icon-close lew-alert-close-icon"
      type="close"
      @click="emit('close')"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
