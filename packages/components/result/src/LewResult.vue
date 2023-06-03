<script setup lang="ts">
import { _props } from './props'

defineProps(_props)
</script>

<template>
  <lew-flex direction="y" class="lew-result">
    <lew-flex class="lew-result-icon" :class="`lew-result-icon-${type}`">
      <lew-icon v-if="type === `normal`" size="60" type="info" />
      <lew-icon
        v-if="type === `warning`"
        size="60"
        type="alert-triangle"
      />
      <lew-icon
        v-if="type === `success`"
        size="60"
        type="smile"
      />
      <lew-icon
        v-if="type === `error`"
        size="60"
        type="alert-circle"
      />
      <lew-icon v-if="type === `info`" size="60" type="bell" />
    </lew-flex>
    <lew-title class="lew-result-title">
      {{ title }}
    </lew-title>
    <div class="lew-result-content">
      {{ content }}
    </div>
    <div>
      <slot name="handle" />
    </div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-result {
    .lew-result-icon {
        width: 100px;
    }

    .lew-result-title {
        font-size: 22px;
    }

    .lew-result-content {
        max-width: 50%;
    }

    .lew-result-icon-success {
        color: var(--lew-success-color);
    }

    .lew-result-icon-warning {
        color: var(--lew-warning-color);
    }

    .lew-result-icon-normal {
        color: var(--lew-normal-color-dark);
    }

    .lew-result-icon-error {
        color: var(--lew-error-color);
    }

    .lew-result-icon-info {
        color: var(--lew-info-color);
    }
}
</style>
